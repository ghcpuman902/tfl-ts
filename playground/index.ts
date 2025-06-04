import express from 'express';
import { config } from 'dotenv';
import TflClient from '../src/index';

config();

// Initialize TfL client
const client = new TflClient();

// Wrapper functions for exploring TfL API
export const getAvailableModes = async (): Promise<string[]> => {
  try {
    const meta = await client.line.getMeta();
    return meta.modes.map(mode => mode.modeName || '').filter(Boolean);
  } catch (error) {
    console.error('Error getting available modes:', error);
    return ['tube', 'bus', 'dlr', 'overground', 'tram'];
  }
};

export const getRoutesByMode = async (mode: string): Promise<any[]> => {
  try {
    const lines = await client.line.get({ modes: [mode] });
    return lines.map(line => ({
      id: line.id,
      name: line.name,
      modeName: line.modeName
    }));
  } catch (error) {
    console.error(`Error getting routes for mode ${mode}:`, error);
    return [];
  }
};

export const getRouteDetails = async (mode: string, id: string): Promise<any> => {
  try {
    const [lineInfo, routeInfo, statusInfo] = await Promise.all([
      client.line.get({ ids: [id] }),
      client.line.getRoute({ ids: [id] }),
      client.line.getStatus({ ids: [id] })
    ]);

    return {
      basic: lineInfo[0] || {},
      route: routeInfo[0] || {},
      status: statusInfo[0] || {},
      mode
    };
  } catch (error) {
    console.error(`Error getting details for route ${id}:`, error);
    return { error: 'Failed to fetch route details', mode, id };
  }
};

// Express app setup
const app = express();

app.get('/', async (req, res) => {
  try {
    const modes = await getAvailableModes();
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>TfL API Playground</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          .form-group { margin: 20px 0; }
          label { display: block; margin-bottom: 5px; font-weight: 600; }
          select, button { padding: 10px; font-size: 16px; border: 1px solid #ddd; border-radius: 4px; }
          button { background: #007bff; color: white; cursor: pointer; }
          button:hover { background: #0056b3; }
          .header { text-align: center; margin-bottom: 30px; }
          .description { background: #f8f9fa; padding: 20px; border-radius: 4px; margin-bottom: 30px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚇 TfL API Playground</h1>
          <p>Explore Transport for London API data</p>
        </div>
        
        <div class="description">
          <h3>Available Transport Modes</h3>
          <p>Select a transport mode below to explore available routes and get detailed information about lines, stations, and real-time status.</p>
        </div>

        <form method="GET" action="/explore">
          <div class="form-group">
            <label for="mode">Select Transport Mode:</label>
            <select name="mode" id="mode" required>
              ${modes.map(m => `<option value="${m}">${m.charAt(0).toUpperCase() + m.slice(1)}</option>`).join('')}
            </select>
          </div>
          <button type="submit">🔍 Explore Routes</button>
        </form>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error loading available modes');
  }
});

app.get('/explore', async (req, res) => {
  try {
    const { mode } = req.query;
    const routes = await getRoutesByMode(mode as string);
    
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Routes for ${mode}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .route-list { list-style: none; padding: 0; }
          .route-item { margin: 10px 0; padding: 15px; background: #f8f9fa; border-radius: 4px; border-left: 4px solid #007bff; }
          .route-item a { text-decoration: none; color: #007bff; font-weight: 600; }
          .route-item a:hover { color: #0056b3; }
          .back-link { display: inline-block; margin-bottom: 20px; color: #6c757d; text-decoration: none; }
          .back-link:hover { color: #495057; }
          .route-count { color: #6c757d; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <a href="/" class="back-link">← Back to Transport Modes</a>
        
        <div class="header">
          <h1>${(mode as string).charAt(0).toUpperCase() + (mode as string).slice(1)} Routes</h1>
        </div>
        
        <div class="route-count">
          Found ${routes.length} route${routes.length === 1 ? '' : 's'}
        </div>

        <ul class="route-list">
          ${routes.map((r: any) => `
            <li class="route-item">
              <a href="/route?mode=${mode}&id=${r.id}">
                ${r.name || r.id} ${r.modeName ? `(${r.modeName})` : ''}
              </a>
            </li>
          `).join('')}
        </ul>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error loading routes');
  }
});

app.get('/route', async (req, res) => {
  try {
    const { mode, id } = req.query;
    const details = await getRouteDetails(mode as string, id as string);
    
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Route Detail: ${id}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 1000px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .back-link { display: inline-block; margin-bottom: 20px; color: #6c757d; text-decoration: none; }
          .back-link:hover { color: #495057; }
          .details-container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
          .detail-section { background: #f8f9fa; padding: 20px; border-radius: 4px; }
          .detail-section h3 { margin-top: 0; color: #495057; border-bottom: 2px solid #dee2e6; padding-bottom: 10px; }
          .status-good { color: #28a745; }
          .status-warning { color: #ffc107; }
          .status-bad { color: #dc3545; }
          .json-container { background: #f8f9fa; padding: 20px; border-radius: 4px; overflow-x: auto; }
          pre { margin: 0; white-space: pre-wrap; word-wrap: break-word; }
          @media (max-width: 768px) {
            .details-container { grid-template-columns: 1fr; }
          }
        </style>
      </head>
      <body>
        <a href="/explore?mode=${mode}" class="back-link">← Back to ${mode} routes</a>
        
        <div class="header">
          <h1>🚇 Route Details</h1>
          <h2>${details.basic?.name || id}</h2>
        </div>

        <div class="details-container">
          <div class="detail-section">
            <h3>📋 Basic Information</h3>
            <p><strong>ID:</strong> ${details.basic?.id || 'N/A'}</p>
            <p><strong>Name:</strong> ${details.basic?.name || 'N/A'}</p>
            <p><strong>Mode:</strong> ${details.basic?.modeName || mode}</p>
            <p><strong>Created:</strong> ${details.basic?.created ? new Date(details.basic.created).toLocaleDateString() : 'N/A'}</p>
          </div>

          <div class="detail-section">
            <h3>🚦 Current Status</h3>
            ${details.status?.lineStatuses?.map((status: any) => `
              <div style="margin-bottom: 10px;">
                <p><strong>Status:</strong> <span class="${status.statusSeverity <= 10 ? 'status-good' : status.statusSeverity <= 15 ? 'status-warning' : 'status-bad'}">${status.statusSeverityDescription || 'Unknown'}</span></p>
                ${status.reason ? `<p><strong>Reason:</strong> ${status.reason}</p>` : ''}
              </div>
            `).join('') || '<p>No status information available</p>'}
          </div>
        </div>

        <div class="detail-section">
          <h3>🔧 Full API Response</h3>
          <div class="json-container">
            <pre>${JSON.stringify(details, null, 2)}</pre>
          </div>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error loading route details');
  }
});

app.listen(3000, () => {
  console.log('🚇 TfL API Playground running at http://localhost:3000');
  console.log('Make sure you have your TfL API credentials set up in .env file or environment variables');
}); 