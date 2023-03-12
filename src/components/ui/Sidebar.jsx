import "../../styles/Sidebar.css";
import Button from "./Button";
import Tooltip from "./Tooltip";
import { useState } from "preact/hooks";
import {
  AiOutlineMenu,
  AiOutlineMenuFold,
  IoBookmark,
  IoCalendarClear,
  IoChatboxEllipses,
  IoFileTray
} from '../../assets/icons';

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const Toolbar = ({ title, icon, onClick }) => {
    return (
      <div class="sidebar-icon__wrapper">
        <Tooltip
          content={title}
          position="right"
          height="80%"
          radius="50%"
        >
          <Button
            title={icon}
            className="btn-transparent btn-svgpair btnsvg-larger"
            aria-label={title}
            onClick={onClick ? onClick : null}
          />
        </Tooltip>
      </div>
    );
  };

  return (
    <aside class={open ? "sidebar show-sidebar" : "sidebar hide-sidebar"}>
      <div class="sidebar-header">
        <div class="sidebar__row">
          <Toolbar
            title={open ? "close menu" : "open menu"}
            icon={open ? <AiOutlineMenuFold /> : <AiOutlineMenu />}
            onClick={() => setOpen(prev => !prev)}
          />
        </div>
      </div>

      <div class="sidebar-body">
        <div class="sidebar__row">
          <Toolbar
            title={"bookmarks icon"}
            icon={<IoBookmark />}
          />
          <div class="sidebar-content">
            <span>example content</span>
          </div>
        </div>

        <div class="sidebar__row">
          <Toolbar title={"calendar icon"} icon={<IoCalendarClear />} />
          <div class="sidebar-content">
            <span>example content</span>
          </div>
        </div>

        <div class="sidebar__row">
          <Toolbar title={"chat icon"} icon={<IoChatboxEllipses />} />
          <div class="sidebar-content">
            <span>example content</span>
          </div>
        </div>

        <div class="sidebar__row">
          <Toolbar title={"files icon"} icon={<IoFileTray />} />
          <div class="sidebar-content">
            <span>example content</span>
          </div>
        </div>
      </div>


      <div class="sidebar-footer">
        <div class="sidebar__row">
          <div class="sidebar-content"></div>
        </div>
      </div>
    </aside>
  );
};
