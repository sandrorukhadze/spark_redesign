import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AppRoutes from "./routes";

const App: React.FC = () => {
  return (
    <div>
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main content area (pushed right by sidebar width) */}
      <div className="pl-64 min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-4">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default App;
