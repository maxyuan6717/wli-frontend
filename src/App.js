import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import Landing from "./pages/landing";
import Upload from "./pages/upload";
import CustomNav from "./components/navbar";

function App() {
  return (
    <div className={styles.container}>
      <Router>
        <CustomNav />
        <Switch>
          <Route path="/upload" component={Upload} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
