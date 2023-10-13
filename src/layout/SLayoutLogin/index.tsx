import Image from "next/image"
import Router from "next/router"

interface LayoutProps {
  children: any
}

const SLayoutLogin = (props: LayoutProps) => {
  return (
    <>
      <div className="v-application v-application--is-ltr theme--light">
        <div className="v-application--wrap">
          <div className="app-flex-box">
            <div className="navi-view hide-in-xs">
              <div className="bar-width">
                <div className="navi-content-wrapper">
                  <div className="navi-content-box bar-width">
                    <div className="bar-item-list  d-flex flex-column ">
                      <div className="d-flex profile-container">
                        <button
                          className="profile-button mb-2"
                          onClick={() => {
                            Router.push(`/`)
                          }}
                        >
                          <Image width={30} height={30} src="/img/login_left_logo.svg" alt="logo" />
                        </button>
                      </div>
                      <button className="LoginHomeBtn">
                        <img src="/img/leftIcon01.svg" />
                        <p>홈</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-view">
              <div className="view-content-wrapper wrapper-width">
                <div className="view-content-box">
                  <div className="primary-column">{props.children}</div>
                  <div className="sidebar-column sidebar-width" style={{ display: "none" }}>
                    <div className="sidebar-content-wrapper">
                      <div className="sidebar-content-box sidebar-width">
                        <div className="side-bar-column-content"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SLayoutLogin
