import React from "react";
import { createContext, PropsWithChildren, useContext } from "react";
import { Form } from "antd";
import { FormInstance } from "antd/lib/form/Form";

// hooks
import { IBlendData, IFormBlender, IJoinItem, INodeBlenderItem } from "@src/types/blender";

// mocks
import { nodeOptions } from "@src/mocks/blend-query-mock";

// configs
import { NAME_STORAGE } from "@src/config/storage";

// hooks
import { useLocalStorage } from "@src/hooks/use-localstorage";

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
  blendData: IBlendData | null;
  openBlendExplorer: (isOpen: boolean) => void;
  editBlendNode: (node: IFormBlender) => void;
};

export const BlenderContext = createContext<BlenderContextType>({} as BlenderContextType);

export const BlenderContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // states
  const [isOpenBlend, setIsOpenBlend] = React.useState(false);
  const [form] = Form.useForm();
  const [blendData, setBlendData] = useLocalStorage<IBlendData | null>(NAME_STORAGE.BLEND_DATA, null);
  const [blendNode, setBlendNode] = React.useState<IFormBlender | null>(null);


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
      if(blendNode) {
        // mode edit
        form.setFieldsValue({
          alias: blendNode.alias,
          [SOURCE]: blendNode.sources,
          [DIMENSIONS]: blendNode.dimensions || [],
          [JOINS]: blendNode.joins || [],
        });
      } else {
        // mode create
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
     
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpenBlend, blendNode]);

  function openBlendExplorer(isOpen: boolean) {
    setIsOpenBlend(isOpen);
  }

  function editBlendNode(node: IFormBlender) {
    setBlendNode(node);
    openBlendExplorer(true)
  }

  async function onFinishBlendData(values: IFormBlender) {
    setBlendData((prevState: IBlendData) => ({
      ...prevState,
      [values.alias]: values
    }))
    openBlendExplorer(false);
  }

  return (
    <Form name="form-blender" form={form} initialValues={initialValues} onFinish={onFinishBlendData} autoComplete="off">
      <BlenderContext.Provider value={{ form, blendData, isOpenBlend, openBlendExplorer, editBlendNode }}>{children}</BlenderContext.Provider>
    </Form>
  );
};

export const useBlenderContext = () => useContext(BlenderContext);
