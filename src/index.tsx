import ReactDOM from "react-dom/client";
import IndexPage from "./pages/Index/IndexPage";

import {Provider as StoreProvider} from "react-redux";
import {store} from "./store/store";
import {HashRouter, Route, Routes, useLocation} from "react-router-dom";

import "animate.css";
import "./styles/main.sass";
import Notifications from "./components/main/Notifications/Notifications";
import {clearExpiredNotifications} from "./helpers/notifications";
import Navigation from "./components/main/Navigation/Navigation";
import ChatsPage from "./pages/Chats/ChatsPage";
import ChatPage from "./pages/Chat/ChatPage";
import SettingsPage from "./pages/Settings/SettingsPage";
import SignInPage from "./pages/SignIn/SignInPage";
import SignUpPage from "./pages/SignUp/SignUpPage";
import UserPage from "./pages/User/UserPage";
import MePage from "./pages/Me/Me";

function NavigationRenderer() {

  const location = useLocation();

  // List of pages with navigation shown
  return [
    "/chats",
    "/me",
    "/settings"
  ].includes(location.pathname) ? (
      <Navigation />
    ) : null;
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StoreProvider store={store}>
    <HashRouter basename="">
      <div
        className="App"
        style={{
          "--majorColor": "#102fb3"
        } as any}
      >
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/me" element={<MePage />} />
          <Route path="/user" element={<UserPage />} />

          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
        </Routes>
        <NavigationRenderer />
      </div>
    </HashRouter>
    <Notifications />
  </StoreProvider>
);

// Clear expired notifications
setInterval(clearExpiredNotifications, 1000);
