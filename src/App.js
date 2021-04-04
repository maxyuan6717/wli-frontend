import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import Landing from "./pages/landing";
import Upload from "./pages/upload";

function App() {
  return (
    <div className={styles.container}>
      <Router>
        <Switch>
          <Route path="/upload" component={Upload} />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
