import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import AppRoutes from "./routes";

const App: React.FC = () => {
  return (
    <div>
      {/* Sidebar (left) */}
      <Sidebar />

      {/* Main area */}
      <div className="pl-64 min-h-screen bg-gray-100 flex flex-col">
        {/* Sticky Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-4 overflow-y-auto">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
};

export default App;
