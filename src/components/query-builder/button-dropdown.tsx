import { Button, Dropdown } from "antd";

const ButtonDropdown = ({ overlay, ...buttonProps }: any) => (
  <Dropdown overlay={overlay} placement="bottomLeft" trigger={["click"]} destroyPopupOnHide>
    <Button {...buttonProps} />
  </Dropdown>
);

export default ButtonDropdown;
