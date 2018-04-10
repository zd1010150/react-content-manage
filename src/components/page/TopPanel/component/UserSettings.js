import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Icon } from "antd";
const Item = Menu.Item;
import { intlShape, injectIntl } from "react-intl";
import classNames from "classnames/bind";
import styles from "../TopPanel.less";

const propTypes = {
  onClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};
const cx = classNames.bind(styles);

const UserSettings = ({ intl, onClick, email }) => {
  const { formatMessage } = intl;
  const settingOptions = [
    {
      id: 0,
      name: "Email Setting",
      path: "user/email-setting",
      isDisabled: false
    },
    {
      id: 1,
      name: "my profile",
      path: "abc",
      isDisabled: false
    },
    {
      id: 2,
      name: "my settings",
      path: "abc",
      isDisabled: false
    },
    {
      id: 3,
      name: "developer console",
      path: "abc",
      isDisabled: true
    },
    {
      id: 4,
      name: "log out",
      path: "abc",
      isDisabled: false
    }
  ];

  const menuItems = settingOptions.map(option => {
    const child =
      option.name === "log out"
        ? <span onClick={onClick}>
            {option.name}
          </span>
        : <Link to={`/${option.path}`}>
            {option.name}
          </Link>;
    return (
      <Item key={option.id} disabled={option.isDisabled}>
        {child}
      </Item>
    );
  });
  const menu = (
    <Menu>
      {menuItems}
    </Menu>
  );
  return (
    <div data-role="language">
      <Dropdown overlay={menu}>
        <button className={cx("ant-dropdown-link")}>
          {email} <Icon type="down" />
        </button>
      </Dropdown>
    </div>
  );
};

UserSettings.propTypes = propTypes;
export default injectIntl(UserSettings);
