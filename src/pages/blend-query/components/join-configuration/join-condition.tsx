import React from "react";
import { Form, FormListFieldData } from "antd";
import { FormInstance } from "antd/lib/form/Form";

// context
import { JOINS, SOURCE } from "@src/contexts/blender-context";

// types
import { IDropdownOption, IJoinOn, INodeBlenderItem, IOptionAvailable } from "@src/types/blender";

// components
import JoinConditionTable from "./join-condition-table";

type IProps = {
  nameJoin: number;
  fieldsOn: FormListFieldData[];
  form: FormInstance<any>;
  removeOn: (name: number) => void;
};

function JoinCondition({ nameJoin, fieldsOn, form, removeOn }: IProps) {
  const joinOn: IJoinOn[] = Form.useWatch([JOINS, nameJoin, "on"]) || [];
  const sources = form.getFieldValue([SOURCE]);

  const { optionsLeft, optionsRight } = React.useMemo(() => {
    const sourcesLeft = sources.slice(0, nameJoin + 1);
    const sourcesRight = [sources[nameJoin + 1]];

    const optionsLeft: IDropdownOption[] = [];
    const optionsRight: IDropdownOption[] = [];

    sourcesLeft.forEach((source: INodeBlenderItem) => {
      const combineDimAndMeasures: any[] = [...source.dimensions, ...source.measures];
      const nameSource = source.source_alias || source.query_step_alias;
      combineDimAndMeasures.forEach((option, index) => {
        optionsLeft.push({
          label: `${option.name} (${nameSource})`,
          value: `${nameSource}.${option.name}.${index}`,
          title: `${nameSource}.${option.name}`,
        });
      });
    });

    sourcesRight.forEach((source: INodeBlenderItem) => {
      const combineDimAndMeasures: any[] = [...source.dimensions, ...source.measures];
      const nameSource = source.source_alias || source.query_step_alias;
      combineDimAndMeasures.forEach((option, index) => {
        optionsRight.push({
          label: `${option.name} (${nameSource})`,
          value: `${nameSource}.${option.name}.${index}`,
          title: `${nameSource}.${option.name}`,
        });
      });
    });
    return { optionsLeft, optionsRight };
  }, [nameJoin, sources]);

  return (
    <>
      {fieldsOn.map(({ name: nameMember, key }) => {
        return (
          <JoinConditionTable
            key={key}
            optionsLeft={optionsLeft}
            optionsRight={optionsRight}
            joinOn={joinOn}
            nameMember={nameMember}
            nameJoin={nameJoin}
            form={form}
            removeOn={removeOn}
          />
        );
      })}
    </>
  );
}

export default JoinCondition;
