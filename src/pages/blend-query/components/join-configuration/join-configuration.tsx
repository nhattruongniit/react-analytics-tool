import React from "react";
import { FormInstance } from "antd/lib/form/Form";

// context
import { JOINS } from "@src/contexts/blender-context";

// components
import JoinConfigurationModal from "./join-configuration-modal";

type IProps = {
  index: number;
  form: FormInstance<any>;
  nameJoin: number;
};

function JoinConfiguration({ form, index, nameJoin }: IProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const joinItem = form.getFieldValue(JOINS)?.[nameJoin] || null;
  return (
    <>
      <JoinConfigurationModal
        index={index}
        joinItem={joinItem}
        nameJoin={nameJoin}
        form={form}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

export default JoinConfiguration;
