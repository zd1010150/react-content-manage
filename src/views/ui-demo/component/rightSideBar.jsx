/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { RightSider } from 'components/page/index';
import { toggleRightSider, settingRightSider } from 'components/page/RightSider/flow/action';

class RightSideBar extends React.Component {
  componentDidMount() {
        // 可以在这里调用 this.props.settingRightSider  进行设置右边侧栏的宽度
  }
  render() {
    const { toggleRightSider } = this.props;
    return (
      <div>
        <p>
            随着 JavaScript 单页应用开发日趋复杂，JavaScript 需要管理比任何时候都要多的 state （状态）。 这些 state 可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。

            管理不断变化的 state 非常困难。如果一个 model 的变化会引起另一个 model 变化，那么当 view 变化时，就可能引起对应 model 以及另一个 model 的变化，依次地，可能会引起另一个 view 的变化。直至你搞不清楚到底发生了什么。state 在什么时候，由于什么原因，如何变化已然不受控制。 当系统变得错综复杂的时候，想重现问题或者添加新功能就会变得举步维艰。

            如果这还不够糟糕，考虑一些来自前端开发领域的新需求，如更新调优、服务端渲染、路由跳转前请求数据等等。前端开发者正在经受前所未有的复杂性，难道就这么放弃了吗？当然不是。

            这里的复杂性很大程度上来自于：我们总是将两个难以理清的概念混淆在一起：变化和异步。 我称它们为曼妥思和可乐。如果把二者分开，能做的很好，但混到一起，就变得一团糟。一些库如 React 试图在视图层禁止异步和直接操作 DOM 来解决这个问题。美中不足的是，React 依旧把处理 state 中数据的问题留给了你。Redux就是为了帮你解决这个问题。

            跟随 Flux、CQRS 和 Event Sourcing 的脚步，通过限制更新发生的时间和方式，Redux 试图让 state 的变化变得可预测。这些限制条件反映在 Redux 的三大原则中
        </p>
        <Button onClick={() => toggleRightSider(false)}>打开右边侧栏</Button>
        <Button onClick={() => toggleRightSider(true)}>关闭右边侧栏</Button>
        <RightSider>
                    我是右边侧栏,可以在我这里面加入任何自组件…… <Button onClick={() => toggleRightSider(true)}>关闭右边侧栏</Button>
        </RightSider>
      </div>
    );
  }
}

const mapDispatchToProps = {
  settingRightSider,
  toggleRightSider,
};

export default connect(null, mapDispatchToProps)(RightSideBar);

