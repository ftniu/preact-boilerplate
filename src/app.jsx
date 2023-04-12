import "./styles/App.css";
import { useState, useEffect } from 'preact/hooks';
import { useLocal, useIsFirstRender } from "./hooks";
import TodoList from "./todo";

import {
  Sidebar,
  Header,
  Button,
  Tooltip,
  Input,
  SvgInput,
  Select,
  Tags,
  Link,
  Toast,
  Checkbox
} from "./components";

import {
  AiOutlineSearch,
  IoCopyOutline,
  RxExternalLink
} from "./assets/icons";

import {
  handleTheme,
  handleUserPreferences,
  copyToClipboard
} from './utils';


/**DEMO*/
function App() {
  const isFirstRender = useIsFirstRender();
  const [theme, setTheme] = useState('');
  const [exampleInput, setExampleInput] = useState("");
  const [exampleToast, setExampleToast] = useState({
    show: false,
    message: "",
    callback: null,
    from: null,
    timeout: null,
  });

  /**
   * @description
   * set initial theme to match system preference
   * set initial language to specific region (if prefaced with en-)
   */
  useEffect(() => {
    if (!isFirstRender) return;
    handleUserPreferences();
    setTheme(useLocal.get("theme"));
  }, []);

  return (
    <>
      <Sidebar />
      <Header
        theme={theme}
        handleTheme={() => handleTheme({ setTheme })}
      />
      <main class="main">

        <TodoList />
        <div class="row">
          <Checkbox
            checked={false}
            className="btn-transparent btn-svgpair btn-force--square"
          />
          <Checkbox checked={false} title="check" />
          <Checkbox checked={false} title="box" />
        </div>


        <div class="row">
          <Tooltip content="click me" height="100%">
            <Button
              class="btn-primary"
              title="click for toast"
              onClick={(e) => {
                setExampleToast(prev => ({
                  show: true,
                  message: "toast example",
                  callback: () => { alert("callback example"); },
                  from: prev.from === e.target ? null : e.target,
                  timeout: null,
                }));
              }}
            />
          </Tooltip>

          <Tooltip content="tooltip example" height="100%">
            <Button className="btn-dark" title="hover for tooltip" />
          </Tooltip>
        </div>


        <div class="row">
          <Button
            title={<><IoCopyOutline /><span>copy</span></>}
            className="btn-primary btn-primary--darker btn-svg__plus-text"
            onClick={(e) => {
              const span = e.target.children[1];
              span.textContent = "copied!";
              e.target.classList.add("btn__success");
              copyToClipboard("https://github.com/chaseottofy/react-boiler-v3");
              setTimeout(() => {
                e.target.classList.remove("btn__success");
                span.textContent = "copy";
              }, 800);
            }}
          />

          <Link
            content={
              <Button
                title={
                  <>
                    <span>visit repo</span>
                    <RxExternalLink />
                  </>
                }
                className="btn-primary btn-primary--darker btn-svg__plus-text"
                disabled={true}
              />
            }
            href="https://github.com/chaseottofy/react-boiler-v3"
            title="github repo"
          />
        </div>


        <div class="row">
          <Select
            title="Select an option..."
            width="60%"
            maxWidth="180px"
            options={[
              { value: "close", label: "close" },
              { value: "on", label: "on" },
              { value: "click", label: "click" },
              { value: "away", label: "away" },
            ]}
          />
        </div>

        <div class="row">
          <Input
            placeholder="input one"
            value={exampleInput}
            onInput={(e) => setExampleInput(e.target.value)}
          />
          {/*icon not visible to aria/interactive unless input > 0*/}
          <Button
            title={<IoCopyOutline />}
            className="btn-transparent btn-svgpair"
            disabled={exampleInput.length === 0}
            onClick={(e) => {
              if (exampleInput.length === 0) return;
              copyToClipboard(exampleInput);
              e.target.classList.add("btn__success");
              setTimeout(() => {
                e.target.classList.remove("btn__success");
              }, 800);
            }}
          />
        </div>


        <div class="row">
          <Input
            className="input-primary"
            placeholder="input two"
            value={exampleInput}
            onInput={(e) => setExampleInput(e.target.value)}
          />
        </div>


        <div class="row">
          <SvgInput
            svg={<AiOutlineSearch />}
            input={
              <Input
                className="input-dark"
                placeholder="input three"
                value={exampleInput}
                role="search"
                onInput={(e) => setExampleInput(e.target.value)}
              />
            }
          />
        </div>


        <div class="row">
          <Tags tags={["ADD(space/enter)", "PREV(backspace)", "DEL(click)"]} />
        </div>

      </main>

      <Toast toast={exampleToast} setToast={setExampleToast} />
    </>
  );
}

export default App;