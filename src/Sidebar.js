
import React from 'react'

function Menu  ({
    magnetIn,
    magnetOut,
    setRightMenuVisible,
    rightMenuVisible,
    setCarIndex
  })  {
    return (
      <div className="sidebar-items">
        <div className="menu-container">
          <input
            type="checkbox"
            class="menu-btn"
            id="menu-btn"
            onMouseEnter={magnetIn}
            onMouseLeave={magnetOut}
          />
          <label
            for="menu-btn"
            class="menu-icon"
            onMouseEnter={magnetIn}
            onMouseLeave={magnetOut}
            onClick={() => setRightMenuVisible(!rightMenuVisible)}
          >
            <span class="navicon"></span>
          </label>
        </div>
        <a href="https://www.dropbox.com/s/wchtpctilaxujfv/ISHAN_UPDATED_RESUME.pdf?dl=0" className="current-item"
           onMouseEnter={magnetIn}
            onMouseLeave={magnetOut}
        >
  
              Resume
         
        
        </a>
        <div className="arrow-containers">
          <button
            id="menu-wrapper"
            className="menu-wrapper"
            onMouseEnter={magnetIn}
            onMouseLeave={magnetOut}
            onClick={setCarIndex((index) => (index + 1) % 2)}
          >
            <a href="#" class="link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M6.47 10.78a.75.75 0 010-1.06l5.25-5.25a.75.75 0 011.06 0l5.25 5.25a.75.75 0 11-1.06 1.06L13 6.81v12.44a.75.75 0 01-1.5 0V6.81l-3.97 3.97a.75.75 0 01-1.06 0z"></path></svg>
            </a>
          </button>
          <button
            id="menu-wrapper"
            className="menu-wrapper"
            onMouseEnter={magnetIn}
            onMouseLeave={magnetOut}
          >
            <a href="#" class="link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M4.97 13.22a.75.75 0 000 1.06l6.25 6.25a.75.75 0 001.06 0l6.25-6.25a.75.75 0 10-1.06-1.06l-4.97 4.97V3.75a.75.75 0 00-1.5 0v14.44l-4.97-4.97a.75.75 0 00-1.06 0z"></path></svg>
            </a>
          </button>
        </div>
      </div>
    );
  };

  export default Menu;