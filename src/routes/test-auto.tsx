import { createSignal, createResource } from "solid-js";
import { scanFirebaseFolder, initializeAutoDiscovery } from "~/utils/firebase-images";
import AdminProtected from "~/components/AdminProtected";

function TestAutoContent() {
  const [testResults, setTestResults] = createSignal<any>(null);

  const runTest = async () => {
    console.log('🧪 Testing auto-discovery...');
    
    try {
      // Test 1: Scan Firebase folder
      console.log('📁 Step 1: Scanning Firebase folder...');
      const scanResults = await scanFirebaseFolder();
      console.log('Scan results:', scanResults);
      
      // Test 2: Full auto-discovery
      console.log('🤖 Step 2: Running full auto-discovery...');
      const discoveryResults = await initializeAutoDiscovery();
      console.log('Discovery results:', discoveryResults);
      
      setTestResults({
        scan: scanResults,
        discovery: discoveryResults,
        success: true
      });
      
    } catch (error) {
      console.error('❌ Test failed:', error);
      setTestResults({
        error: error.message,
        success: false
      });
    }
  };

  return (
    <div class="max-w-4xl mx-auto space-y-8">
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-eros-dark">
          🧪 Auto-Discovery Test
        </h1>
        <p class="text-xl text-muted">
          Testing the automatic book cover discovery system
        </p>
      </div>

      <div class="card">
        <button
          onClick={runTest}
          class="btn-primary"
        >
          🚀 Run Auto-Discovery Test
        </button>
      </div>

      {testResults() && (
        <div class="card">
          <h2 class="text-2xl font-bold text-eros-dark mb-4">Test Results</h2>
          
          {testResults().success ? (
            <div class="space-y-4">
              <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 class="font-semibold text-green-800">✅ Success!</h3>
                <p class="text-green-700">Auto-discovery system is working</p>
              </div>
              
              <div>
                <h3 class="font-semibold text-eros-dark mb-2">Discovered Files:</h3>
                <pre class="text-xs bg-surface p-4 rounded border overflow-auto">
                  {JSON.stringify(testResults().scan.files, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 class="font-semibold text-eros-dark mb-2">Auto-Generated Mappings:</h3>
                <pre class="text-xs bg-surface p-4 rounded border overflow-auto">
                  {JSON.stringify(testResults().discovery.mappings, null, 2)}
                </pre>
              </div>
              
              <div>
                <h3 class="font-semibold text-eros-dark mb-2">Auto-Detected Tokens:</h3>
                <pre class="text-xs bg-surface p-4 rounded border overflow-auto">
                  {JSON.stringify(testResults().discovery.tokens, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 class="font-semibold text-red-800">❌ Error</h3>
              <p class="text-red-700">{testResults().error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TestAuto() {
  return (
    <AdminProtected>
      <TestAutoContent />
    </AdminProtected>
  );
}
