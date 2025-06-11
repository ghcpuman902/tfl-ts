import express from 'express';
import { config } from 'dotenv';
import TflClient, { ModeName, TflLineId } from '../src/index';

config();

// Initialize TfL client
const client = new TflClient();
client.line.get

// Enhanced wrapper functions showcasing our added value
export const getAvailableModes = async (): Promise<string[]> => {
  try {
    const meta = await client.line.getMeta();
    return meta.modes.map(mode => mode.modeName || '').filter(Boolean);
  } catch (error) {
    console.error('Error getting available modes:', error);
    return ['tube', 'bus', 'dlr', 'overground', 'tram'];
  }
};

// Showcase batch request capabilities
export const getMultipleRouteStatus = async (ids: string[]): Promise<any[]> => {
  try {
    return await client.line.getStatus({ ids: ids as TflLineId[] });
  } catch (error) {
    console.error('Error getting multiple route status:', error);
    return [];
  }
};

// Showcase parallel processing of different data types
export const getRouteDetails = async (mode: string, id: string): Promise<any> => {
  try {
    const [lineInfo, routeInfo, statusInfo, disruptions] = await Promise.all([
      client.line.get({ ids: [id as TflLineId] }),
      client.line.getRoute({ ids: [id as TflLineId] }),
      client.line.getStatus({ ids: [id as TflLineId] }),
      client.line.getDisruption({ ids: [id as TflLineId] })
    ]);

    return {
      basic: lineInfo[0] || {},
      route: routeInfo[0] || {},
      status: statusInfo[0] || {},
      disruptions: disruptions || [],
      mode
    };
  } catch (error) {
    console.error(`Error getting details for route ${id}:`, error);
    return { error: 'Failed to fetch route details', mode, id };
  }
};

// Showcase stop point batch requests
export const getMultipleStopPoints = async (ids: string[]): Promise<any[]> => {
  try {
    return await client.stopPoint.get({ ids });
  } catch (error) {
    console.error('Error getting multiple stop points:', error);
    return [];
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
          .feature-section { margin: 20px 0; padding: 20px; background: #e9ecef; border-radius: 4px; }
          .feature-title { color: #0056b3; margin-bottom: 10px; }
          .feature-list { list-style: none; padding: 0; }
          .feature-item { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
          .code-snippet { 
            margin-top: 15px; 
            background: #1e1e1e; 
            border-radius: 4px; 
            overflow: hidden;
          }
          .code-snippet pre { 
            margin: 0; 
            padding: 15px; 
            color: #d4d4d4; 
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 14px;
            line-height: 1.5;
            overflow-x: auto;
          }
          .code-snippet code {
            font-family: inherit;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚇 TfL API Playground</h1>
          <p>Explore Transport for London API data with enhanced features</p>
        </div>
        
        <div class="description">
          <h3>Enhanced Features</h3>
          <div class="feature-section">
            <h4 class="feature-title">🎯 Batch Processing</h4>
            <ul class="feature-list">
              <li class="feature-item">✓ Multiple line status requests in one call</li>
              <li class="feature-item">✓ Batch stop point information retrieval</li>
              <li class="feature-item">✓ Automatic request chunking and rate limiting</li>
            </ul>
            <div class="code-snippet">
              <pre><code>// Example of batch processing multiple line statuses
const statuses = await client.line.getStatus({ 
  ids: ['central', 'victoria', 'jubilee'] 
});</code></pre>
            </div>
          </div>

          <div class="feature-section">
            <h4 class="feature-title">⚡ Performance Optimizations</h4>
            <ul class="feature-list">
              <li class="feature-item">✓ Parallel processing of independent requests</li>
              <li class="feature-item">✓ Automatic retry mechanism for failed requests</li>
              <li class="feature-item">✓ Efficient data caching and response mapping</li>
            </ul>
            <div class="code-snippet">
              <pre><code>// Example of parallel processing
const [lineInfo, routeInfo, statusInfo] = await Promise.all([
  client.line.get({ ids: ['central'] }),
  client.line.getRoute({ ids: ['central'] }),
  client.line.getStatus({ ids: ['central'] })
]);</code></pre>
            </div>
          </div>

          <div class="feature-section">
            <h4 class="feature-title">🛡️ Error Handling</h4>
            <ul class="feature-list">
              <li class="feature-item">✓ Consistent error propagation</li>
              <li class="feature-item">✓ Detailed error messages and logging</li>
              <li class="feature-item">✓ Graceful fallbacks for failed requests</li>
            </ul>
            <div class="code-snippet">
              <pre><code>// Example of error handling with retries
try {
  const stopPoints = await client.stopPoint.get({ 
    ids: ['940GZZLUASL', '940GZZLUBST'] 
  });
} catch (error) {
  console.error('Failed to fetch stop points:', error);
  // Automatic retry is handled by BatchRequest
}</code></pre>
            </div>
          </div>
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
    const routes = await client.line.get({ modes: [mode as ModeName] });
    
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
          .batch-status { margin-top: 20px; padding: 15px; background: #e9ecef; border-radius: 4px; }
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

        <div class="batch-status">
          <h3>Batch Processing Demo</h3>
          <p>Try getting status for multiple routes at once:</p>
          <form method="GET" action="/batch-status">
            <input type="hidden" name="mode" value="${mode}">
            <input type="text" name="ids" placeholder="Enter route IDs (comma-separated)" style="width: 100%; padding: 10px; margin-bottom: 10px;">
            <button type="submit">Get Batch Status</button>
          </form>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error loading routes');
  }
});

app.get('/batch-status', async (req, res) => {
  try {
    const { ids, mode } = req.query;
    const routeIds = (ids as string).split(',').map(id => id.trim());
    const statuses = await getMultipleRouteStatus(routeIds);
    
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Batch Status Results</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .status-list { list-style: none; padding: 0; }
          .status-item { margin: 10px 0; padding: 15px; background: #f8f9fa; border-radius: 4px; }
          .status-good { color: #28a745; }
          .status-warning { color: #ffc107; }
          .status-bad { color: #dc3545; }
          .back-link { display: inline-block; margin-bottom: 20px; color: #6c757d; text-decoration: none; }
          .back-link:hover { color: #495057; }
        </style>
      </head>
      <body>
        <a href="/explore?mode=${mode}" class="back-link">← Back to Routes</a>
        
        <div class="header">
          <h1>Batch Status Results</h1>
          <p>Showing status for ${routeIds.length} routes</p>
        </div>

        <ul class="status-list">
          ${statuses.map((status: any) => `
            <li class="status-item">
              <h3>${status.name || status.id}</h3>
              ${status.lineStatuses?.map((lineStatus: any) => `
                <div style="margin: 10px 0;">
                  <p><strong>Status:</strong> <span class="${lineStatus.statusSeverity <= 10 ? 'status-good' : lineStatus.statusSeverity <= 15 ? 'status-warning' : 'status-bad'}">${lineStatus.statusSeverityDescription || 'Unknown'}</span></p>
                  ${lineStatus.reason ? `<p><strong>Reason:</strong> ${lineStatus.reason}</p>` : ''}
                </div>
              `).join('') || '<p>No status information available</p>'}
            </li>
          `).join('')}
        </ul>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('Error loading batch status');
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
          .enhanced-features { margin-top: 20px; padding: 20px; background: #e9ecef; border-radius: 4px; }
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

        <div class="enhanced-features">
          <h3>✨ Enhanced Features</h3>
          <div class="details-container">
            <div class="detail-section">
              <h4>🔄 Parallel Processing</h4>
              <p>This data was fetched using parallel requests for:</p>
              <ul>
                <li>Basic line information</li>
                <li>Route details</li>
                <li>Current status</li>
                <li>Disruption information</li>
              </ul>
            </div>

            <div class="detail-section">
              <h4>🛡️ Error Handling</h4>
              <p>Features implemented:</p>
              <ul>
                <li>Automatic retries for failed requests</li>
                <li>Graceful fallbacks</li>
                <li>Detailed error logging</li>
              </ul>
            </div>
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