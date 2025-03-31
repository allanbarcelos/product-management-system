import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { store } from "./store";
import { Provider } from "react-redux";
import { AuthProvider } from "@providers/AuthProvider";
import Exceptions from "@components/Exceptions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure Toast styles are included

function App() {
    return (
        <>
            {/* Toast Notifications */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            {/* Global Error Handling */}
            <Exceptions />

            {/* Redux, Authentication, and Routing Setup */}
            <Provider store={store}>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </Provider>
        </>
    );
}

export default App;
