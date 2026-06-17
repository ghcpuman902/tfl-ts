import express from 'express';
import { config } from 'dotenv';
import TflClient, {
  ENDPOINT_COUNT,
  MODES,
  ModeName,
  TflLineId,
  getLineColor,
  getSeverityCategory,
} from '../src/index';

config();

const client = new TflClient();

const PAGE_STYLES = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; line-height: 1.5; color: #212529; }
  .form-group { margin: 20px 0; }
  label { display: block; margin-bottom: 5px; font-weight: 600; }
  select, button, input[type="text"] { padding: 10px; font-size: 16px; border: 1px solid #ddd; border-radius: 4px; }
  button { background: #007bff; color: white; cursor: pointer; border: none; }
  button:hover { background: #0056b3; }
  .header { text-align: center; margin-bottom: 30px; }
  .description, .feature-section, .info-card, .error-card { margin: 20px 0; padding: 20px; border-radius: 8px; }
  .description { background: #f8f9fa; }
  .feature-section { background: #e9ecef; }
  .info-card { background: #fff; border: 1px solid #dee2e6; }
  .error-card { background: #fff5f5; border: 1px solid #f5c2c7; color: #842029; }
  .feature-title { color: #0056b3; margin: 0 0 10px; }
  .feature-list { list-style: none; padding: 0; margin: 0; }
  .feature-item { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
  .code-snippet { margin-top: 15px; background: #1e1e1e; border-radius: 4px; overflow: hidden; }
  .code-snippet pre { margin: 0; padding: 15px; color: #d4d4d4; font-family: Consolas, Monaco, monospace; font-size: 14px; overflow-x: auto; }
  .pill-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
  .pill { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #e7f1ff; color: #004085; font-size: 13px; }
  .back-link { display: inline-block; margin-bottom: 20px; color: #6c757d; text-decoration: none; }
  .back-link:hover { color: #495057; }
  .route-list, .status-list { list-style: none; padding: 0; }
  .route-item, .status-item { margin: 10px 0; padding: 15px; background: #f8f9fa; border-radius: 4px; border-left: 4px solid #007bff; }
  .route-item a { text-decoration: none; color: #007bff; font-weight: 600; }
  .status-good { color: #28a745; }
  .status-warning { color: #ffc107; }
  .status-bad { color: #dc3545; }
  .details-container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
  .detail-section { background: #f8f9fa; padding: 20px; border-radius: 4px; }
  .json-container { background: #f8f9fa; padding: 20px; border-radius: 4px; overflow-x: auto; }
  pre { margin: 0; white-space: pre-wrap; word-wrap: break-word; }
  @media (max-width: 768px) { .details-container { grid-template-columns: 1fr; } }
`;

const renderLayout = (title: string, body: string): string => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    <style>${PAGE_STYLES}</style>
  </head>
  <body>${body}</body>
  </html>
`;

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const getAvailableModes = async (): Promise<string[]> => {
  try {
    const meta = await client.line.getMeta();
    return meta.modes.map((mode) => mode.modeName || '').filter(Boolean);
  } catch (error) {
    console.error('Error getting available modes:', error);
    return ['tube', 'bus', 'dlr', 'overground', 'tram'];
  }
};

export const getMultipleRouteStatus = async (lineIds: string[]): Promise<any[]> => {
  if (!lineIds.length) {
    return [];
  }

  return client.line.getStatus({ lineIds: lineIds as TflLineId[] });
};

export const getRouteDetails = async (mode: string, lineId: string): Promise<any> => {
  try {
    const [lineInfo, routeInfo, statusInfo, disruptions] = await Promise.all([
      client.line.get({ lineIds: [lineId as TflLineId] }),
      client.line.getRoute({ lineIds: [lineId as TflLineId] }),
      client.line.getStatus({ lineIds: [lineId as TflLineId] }),
      client.line.getDisruption({ lineIds: [lineId as TflLineId] }),
    ]);

    const lineColor = getLineColor(lineId);
    const severity = statusInfo[0]?.lineStatuses?.[0]?.statusSeverity;
    const severityCategory = severity !== undefined ? getSeverityCategory(severity) : 'unknown';

    return {
      basic: lineInfo[0] || {},
      route: routeInfo[0] || {},
      status: statusInfo[0] || {},
      disruptions: disruptions || [],
      mode,
      ui: {
        lineColor,
        severityCategory,
      },
    };
  } catch (error) {
    console.error(`Error getting details for route ${lineId}:`, error);
    return { error: 'Failed to fetch route details', mode, id: lineId };
  }
};

export const getMultipleStopPoints = async (stopPointIds: string[]): Promise<any[]> => {
  if (!stopPointIds.length) {
    return [];
  }

  return client.stopPoint.get({ stopPointIds });
};

const app = express();

app.get('/', async (_req, res) => {
  try {
    const modes = await getAvailableModes();
    const modeNames = Object.keys(MODES).slice(0, 8);
    const centralColor = getLineColor('central');

    res.send(renderLayout('Tfl API Playground', `
      <div class="header">
        <h1>TfL API Playground (v2)</h1>
        <p>Explore friendly wrappers, raw endpoints, constants, and UI helpers.</p>
      </div>

      <div class="description">
        <h2>v2 quick reference</h2>
        <div class="info-card">
          <p><strong>${ENDPOINT_COUNT}</strong> REST operations available via <code>client.raw.*</code></p>
          <p>Friendly wrappers use explicit params such as <code>lineIds</code> and <code>stopPointIds</code>.</p>
          <div class="pill-row">
            <span class="pill">client.raw</span>
            <span class="pill">client.realtime.pollArrivals</span>
            <span class="pill">pnpm exec tfl list</span>
            <span class="pill">pnpm exec tfl smoke</span>
          </div>
        </div>
      </div>

      <div class="feature-section">
        <h3 class="feature-title">Raw escape hatch</h3>
        <ul class="feature-list">
          <li class="feature-item">Every REST endpoint via <code>client.raw.&lt;tag&gt;.&lt;method&gt;()</code></li>
          <li class="feature-item">CLI discovery: <code>pnpm exec tfl list --tag line</code></li>
        </ul>
        <div class="code-snippet"><pre><code>await client.raw.line.statusByIds({ ids: ['central'] });
await client.raw.mode.getActiveServiceTypes({});</code></pre></div>
      </div>

      <div class="feature-section">
        <h3 class="feature-title">Friendly wrappers (v2 params)</h3>
        <div class="code-snippet"><pre><code>await client.line.getStatus({ lineIds: ['central', 'victoria'] });
await client.stopPoint.get({ stopPointIds: ['940GZZLUOXC'] });</code></pre></div>
      </div>

      <div class="feature-section">
        <h3 class="feature-title">Realtime + CLI demos</h3>
        <ul class="feature-list">
          <li class="feature-item"><code>pnpm dlx ts-node playground/demo/realtime.ts</code></li>
          <li class="feature-item"><code>pnpm dlx ts-node playground/demo/raw.ts</code></li>
          <li class="feature-item"><code>pnpm run demo:smoke</code> for compile + catalog checks</li>
        </ul>
      </div>

      <div class="feature-section">
        <h3 class="feature-title">Constants and UI helpers</h3>
        <p>Sample modes: ${modeNames.map((mode) => `<code>${escapeHtml(mode)}</code>`).join(', ')}</p>
        <p>Central line color: <span style="color:${centralColor.hex}">${centralColor.hex}</span> (${centralColor.text})</p>
      </div>

      <form method="GET" action="/explore">
        <div class="form-group">
          <label for="mode">Select transport mode</label>
          <select name="mode" id="mode" required>
            ${modes.map((mode) => `<option value="${escapeHtml(mode)}">${escapeHtml(mode.charAt(0).toUpperCase() + mode.slice(1))}</option>`).join('')}
          </select>
        </div>
        <button type="submit">Explore routes</button>
      </form>
    `));
  } catch (error) {
    console.error(error);
    res.status(500).send(renderLayout('Error', '<div class="error-card"><h1>Could not load playground</h1><p>Check your TfL credentials in <code>.env</code>.</p></div>'));
  }
});

app.get('/explore', async (req, res) => {
  try {
    const mode = String(req.query.mode || 'tube');
    const routes = await client.line.get({ modes: [mode as ModeName] });

    res.send(renderLayout(`Routes for ${mode}`, `
      <a href="/" class="back-link">← Back to home</a>
      <div class="header">
        <h1>${escapeHtml(mode.charAt(0).toUpperCase() + mode.slice(1))} routes</h1>
        <p>Found ${routes.length} route${routes.length === 1 ? '' : 's'}</p>
      </div>

      <ul class="route-list">
        ${routes.map((route) => `
          <li class="route-item">
            <a href="/route?mode=${encodeURIComponent(mode)}&id=${encodeURIComponent(route.id || '')}">
              ${escapeHtml(route.name || route.id || 'Unknown')}
              ${route.modeName ? `(${escapeHtml(route.modeName)})` : ''}
            </a>
          </li>
        `).join('')}
      </ul>

      <div class="feature-section">
        <h3 class="feature-title">Batch status demo</h3>
        <p>Try multiple line IDs separated by commas, e.g. <code>central,victoria</code>.</p>
        <form method="GET" action="/batch-status">
          <input type="hidden" name="mode" value="${escapeHtml(mode)}">
          <div class="form-group">
            <label for="ids">Line IDs</label>
            <input type="text" id="ids" name="ids" placeholder="central,victoria,jubilee" style="width:100%;">
          </div>
          <button type="submit">Get batch status</button>
        </form>
      </div>
    `));
  } catch (error) {
    console.error(error);
    res.status(500).send(renderLayout('Error', '<div class="error-card"><h1>Could not load routes</h1><p>Try another mode or verify your API credentials.</p></div>'));
  }
});

app.get('/batch-status', async (req, res) => {
  try {
    const mode = String(req.query.mode || 'tube');
    const rawIds = String(req.query.ids || '').trim();

    if (!rawIds) {
      res.status(400).send(renderLayout('Missing line IDs', `
        <a href="/explore?mode=${encodeURIComponent(mode)}" class="back-link">← Back to routes</a>
        <div class="error-card">
          <h1>Enter at least one line ID</h1>
          <p>Example: <code>central,victoria,jubilee</code></p>
        </div>
      `));
      return;
    }

    const routeIds = rawIds.split(',').map((id) => id.trim()).filter(Boolean);
    const statuses = await getMultipleRouteStatus(routeIds);

    res.send(renderLayout('Batch status results', `
      <a href="/explore?mode=${encodeURIComponent(mode)}" class="back-link">← Back to routes</a>
      <div class="header">
        <h1>Batch status results</h1>
        <p>Showing status for ${routeIds.length} line${routeIds.length === 1 ? '' : 's'}</p>
      </div>

      <ul class="status-list">
        ${statuses.length ? statuses.map((status) => `
          <li class="status-item">
            <h3>${escapeHtml(status.name || status.id || 'Unknown')}</h3>
            ${status.lineStatuses?.map((lineStatus: any) => `
              <div style="margin:10px 0;">
                <p><strong>Status:</strong>
                  <span class="${lineStatus.statusSeverity <= 10 ? 'status-good' : lineStatus.statusSeverity <= 15 ? 'status-warning' : 'status-bad'}">
                    ${escapeHtml(lineStatus.statusSeverityDescription || 'Unknown')}
                  </span>
                </p>
                ${lineStatus.reason ? `<p><strong>Reason:</strong> ${escapeHtml(lineStatus.reason)}</p>` : ''}
              </div>
            `).join('') || '<p>No status information available</p>'}
          </li>
        `).join('') : '<li class="status-item">No statuses returned. Check the line IDs and try again.</li>'}
      </ul>
    `));
  } catch (error) {
    console.error(error);
    res.status(500).send(renderLayout('Error', '<div class="error-card"><h1>Could not load batch status</h1><p>Verify the line IDs and your API credentials.</p></div>'));
  }
});

app.get('/route', async (req, res) => {
  try {
    const mode = String(req.query.mode || 'tube');
    const id = String(req.query.id || '');
    const details = await getRouteDetails(mode, id);
    const lineColor = details.ui?.lineColor;

    res.send(renderLayout(`Route detail: ${id}`, `
      <a href="/explore?mode=${encodeURIComponent(mode)}" class="back-link">← Back to ${escapeHtml(mode)} routes</a>
      <div class="header">
        <h1>Route details</h1>
        <h2 style="color:${lineColor?.hex || '#212529'}">${escapeHtml(details.basic?.name || id)}</h2>
        <p>Severity category: <strong>${escapeHtml(String(details.ui?.severityCategory || 'unknown'))}</strong></p>
      </div>

      <div class="details-container">
        <div class="detail-section">
          <h3>Basic information</h3>
          <p><strong>ID:</strong> ${escapeHtml(details.basic?.id || 'N/A')}</p>
          <p><strong>Name:</strong> ${escapeHtml(details.basic?.name || 'N/A')}</p>
          <p><strong>Mode:</strong> ${escapeHtml(details.basic?.modeName || mode)}</p>
        </div>
        <div class="detail-section">
          <h3>Current status</h3>
          ${details.status?.lineStatuses?.map((status: any) => `
            <div style="margin-bottom:10px;">
              <p><strong>Status:</strong>
                <span class="${status.statusSeverity <= 10 ? 'status-good' : status.statusSeverity <= 15 ? 'status-warning' : 'status-bad'}">
                  ${escapeHtml(status.statusSeverityDescription || 'Unknown')}
                </span>
              </p>
              ${status.reason ? `<p><strong>Reason:</strong> ${escapeHtml(status.reason)}</p>` : ''}
            </div>
          `).join('') || '<p>No status information available</p>'}
        </div>
      </div>

      <div class="feature-section">
        <h3 class="feature-title">Fetched in parallel with v2 params</h3>
        <div class="code-snippet"><pre><code>await Promise.all([
  client.line.get({ lineIds: ['${escapeHtml(id)}'] }),
  client.line.getRoute({ lineIds: ['${escapeHtml(id)}'] }),
  client.line.getStatus({ lineIds: ['${escapeHtml(id)}'] }),
  client.line.getDisruption({ lineIds: ['${escapeHtml(id)}'] }),
]);</code></pre></div>
      </div>

      <div class="detail-section">
        <h3>Full API response</h3>
        <div class="json-container"><pre>${escapeHtml(JSON.stringify(details, null, 2))}</pre></div>
      </div>
    `));
  } catch (error) {
    console.error(error);
    res.status(500).send(renderLayout('Error', '<div class="error-card"><h1>Could not load route details</h1></div>'));
  }
});

app.listen(3000, () => {
  console.log('TfL API Playground running at http://localhost:3000');
  console.log('Set TFL_APP_ID and TFL_APP_KEY in .env before exploring live data.');
});
