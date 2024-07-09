import React from "react";
import { createContext, PropsWithChildren, useContext } from "react";
import { Form } from "antd";
import { FormInstance } from "antd/lib/form/Form";

// hooks
import { IFormBlender, IJoinItem, INodeBlenderItem } from "@src/types/blender";

// context
import { useMultiStepQuery } from "./multi-step-query-context";

// mocks
import { nodeOptions } from "@src/mocks/blend-query-mock";

export const DEFAULT_SOURCE: INodeBlenderItem = {
  query_step_alias: "",
  source_alias: "",
  dimensions: [],
  measures: [],
  filters: [],
};

export const DEFAULT_JOIN: IJoinItem = {
  join_type: "INNER",
  on: [],
};

export const SOURCE = "sources";
export const JOINS = "joins";
export const DIMENSIONS = "dimensions";
export const MEASURES = "measures";

type BlenderContextType = {
  form: FormInstance<IFormBlender>;
  isOpenBlend: boolean;
  openBlendExplorer: (isOpen: boolean) => void;
};

export const BlenderContext = createContext<BlenderContextType>({} as BlenderContextType);

export const BlenderContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // states
  const [isOpenBlend, setIsOpenBlend] = React.useState(false);
  const [form] = Form.useForm();

  const initialValues: IFormBlender = {
    alias: "",
    [SOURCE]: [
      {
        ...DEFAULT_SOURCE,
        query_step_alias: "",
      },
    ],
    [JOINS]: [],
    [DIMENSIONS]: [],
  };

  // create first node
  React.useEffect(() => {
    if (isOpenBlend) {
      form.setFieldsValue({
        alias: "untitled",
        [SOURCE]: [
          {
            ...DEFAULT_SOURCE,
            query_step_alias: nodeOptions[0],
            source_alias: `${nodeOptions[0]}_0`,
          },
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenBlend]);

  function openBlendExplorer(isOpen: boolean) {
    setIsOpenBlend(isOpen);
  }

  async function onFinishBlendData(values: IFormBlender) {
    console.log("onFinish: ", {
      values,
    });
  }

  return (
    <Form name="form-blender" form={form} initialValues={initialValues} onFinish={onFinishBlendData} autoComplete="off">
      <BlenderContext.Provider value={{ form, isOpenBlend, openBlendExplorer }}>{children}</BlenderContext.Provider>
    </Form>
  );
};

export const useBlenderContext = () => useContext(BlenderContext);
