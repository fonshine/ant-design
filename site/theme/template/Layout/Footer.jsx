import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Modal, Icon, message } from 'antd';
import { isLocalStorageNameSupported, loadScript } from '../utils';
import ColorPicker from '../Color/ColorPicker';

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.lessLoaded = false;

    this.state = {
      color: '#108ee9',
    };
  }

  componentDidMount() {
    // for some iOS
    // http://stackoverflow.com/a/14555361
    if (!isLocalStorageNameSupported()) {
      return;
    }
    // 大版本发布后全局弹窗提示
    //   1. 点击『知道了』之后不再提示
    //   2. 超过截止日期后不再提示
    if (
      localStorage.getItem('antd@2.0.0-notification-sent') !== 'true' &&
        Date.now() < new Date('2016/10/14').getTime()
    ) {
      this.infoNewVersion();
    }
  }

  handleColorChange = (color) => {
    const changeColor = () => {
      const { messages } = this.props.intl;
      window.less.modifyVars({
        '@primary-color': color,
      }).then(() => {
        message.success(messages['app.footer.primary-color-changed']);
        this.setState({ color });
      });
    };

    const lessUrl = 'https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js';

    if (this.lessLoaded) {
      changeColor();
    } else {
      window.less = {
        async: true,
      };
      loadScript(lessUrl).then(() => {
        this.lessLoaded = true;
        changeColor();
      });
    }
  }

  infoNewVersion() {
    const { messages } = this.props.intl;
    Modal.info({
      title: messages['app.publish.title'],
      content: (
        <div>
          <img src="https://os.alipayobjects.com/rmsportal/nyqBompsynAQCpJ.svg" alt="Ant Design" />
          <p>
            {messages['app.publish.greeting']}
            <a target="_blank" rel="noopener noreferrer" href="/changelog">antd@2.0.0</a>
            {messages['app.publish.intro']}
            {messages['app.publish.old-version-guide']}
            <a target="_blank" rel="noopener noreferrer" href="http://1x.ant.design">1x.ant.design</a>
            {messages['app.publish.old-version-tips']}
          </p>
        </div>
      ),
      okText: 'OK',
      onOk: () => localStorage.setItem('antd@2.0.0-notification-sent', 'true'),
      className: 'new-version-info-modal',
      width: 470,
    });
  }

  render() {
    return (
      <footer id="footer">
        <ul>
          <li>
            <h2><Icon type="github" /> Ant Design</h2>
            <div>
              <a target="_blank " href="https://github.com/ant-design/ant-design">
                GitHub
              </a>
            </div>
            <div>
              <a href="http://mobile.ant.design">Ant Design Mobile</a>
            </div>
            <div>
              <a href="http://ng.ant.design">NG-ZORRO</a>
              <span> - </span>
              Ant Design of Angular
            </div>
            <div>
              <a target="_blank " href="https://github.com/websemantics/awesome-ant-design">
                <FormattedMessage id="app.footer.awesome" />
              </a>
            </div>
            <div>
              <a target="_blank " href="http://ant-design.gitee.io/">
                <FormattedMessage id="app.footer.chinamirror" />
              </a>
            </div>
            <div style={{ marginTop: 12 }}>
              <ColorPicker
                type="sketch"
                small
                color={this.state.color}
                position="top"
                presetColors={[
                  '#f04134',
                  '#00a854',
                  '#108ee9',
                  '#f5317f',
                  '#f56a00',
                  '#7265e6',
                  '#ffbf00',
                  '#00a2ae',
                ]}
                onChangeComplete={this.handleColorChange}
              />
            </div>
          </li>
          <li>
            <h2><Icon type="link" /> <FormattedMessage id="app.footer.resources" /></h2>
            <div>
              <a href="http://scaffold.ant.design">Scaffolds</a>
              <span> - </span>
              <FormattedMessage id="app.footer.scaffolds" />
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/dvajs/dva">dva</a> - <FormattedMessage id="app.footer.dva" />
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/dvajs/dva-cli">dva-cli</a> -
              <FormattedMessage id="app.footer.dev-tools" />
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://eggjs.org/">Egg</a>
              <span> - </span>
              <FormattedMessage id="app.footer.eggjs" />
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://antv.alipay.com/">AntV</a>
              <span> - </span>
              <FormattedMessage id="app.footer.data-vis" />
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="http://motion.ant.design">Ant Motion</a>
              <span> - </span>
              <FormattedMessage id="app.footer.motion" />
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="http://library.ant.design/">AntD Library</a>
              <span> - </span>
              <FormattedMessage id="app.footer.antd-library" />
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="http://ux.ant.design">Ant UX</a>
              <span> - </span>
              <FormattedMessage id="app.footer.antux" />
            </div>
          </li>
          <li>
            <h2><Icon type="customer-service" /> <FormattedMessage id="app.footer.community" /></h2>
            <div>
              <a href="/changelog">
                <FormattedMessage id="app.footer.change-log" />
              </a>
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/ant-design/ant-design/wiki/FAQ">
                <FormattedMessage id="app.footer.faq" />
              </a>
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://gitter.im/ant-design/ant-design">
                <FormattedMessage id="app.footer.discuss-cn" />
              </a>
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://gitter.im/ant-design/ant-design-english">
                <FormattedMessage id="app.footer.discuss-en" />
              </a>
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="http://new-issue.ant.design/">
                <FormattedMessage id="app.footer.bug-report" />
              </a>
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/ant-design/ant-design/issues">
                <FormattedMessage id="app.footer.issues" />
              </a>
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="http://stackoverflow.com/questions/tagged/antd">
                <FormattedMessage id="app.footer.stackoverflow" />
              </a>
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href="https://segmentfault.com/t/antd">
                <FormattedMessage id="app.footer.segmentfault" />
              </a>
            </div>
          </li>
          <li>
            <h2>Copyright © {new Date().getFullYear()}</h2>
            <div>
              <FormattedMessage id="app.footer.author" />
            </div>
            <div>
              Built with&nbsp;
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/benjycui/bisheng">
                BiSheng
              </a>
            </div>
          </li>
        </ul>
      </footer>
    );
  }
}

export default injectIntl(Footer);
