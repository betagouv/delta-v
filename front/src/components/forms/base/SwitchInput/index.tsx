import { useController, useFormContext } from 'react-hook-form';

import InputGroup from '@/components/forms/core/InputGroup';
import InputGroupHorizontal from '@/components/forms/core/InputGroupHorizontal';
import clsxm from '@/utils/clsxm';

export type SwitchInputProps = {
  horizontal?: boolean;
  label?: string;
  id: string;
  helperText?: string;
  required?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  falseLabel?: string;
  disabled?: boolean;
  trueLabel?: string;
  tooltipMessage?: string;
};

export const SwitchInput = ({
  horizontal,
  label,
  helperText,
  id,
  readOnly = false,
  required = false,
  onClick,
  falseLabel,
  disabled,
  trueLabel,
  tooltipMessage,
}: SwitchInputProps) => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    control,
    name: id,
  });

  const value = watch(id);

  const onToggleSwitch = () => {
    field.onChange(!value);
    if (onClick) {
      onClick();
    }
  };

  const formError = errors[id];

  const Group = horizontal ? InputGroupHorizontal : InputGroup;

  const cursorClassname =
    'after:border-slate-500 after:absolute after:top-[3px] after:start-[3px]  peer-checked:after:start-[31px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all';

  return (
    <Group
      id={id}
      required={required}
      label={label}
      helperText={helperText}
      error={formError?.message as unknown as string | undefined}
      center
      tooltipMessage={tooltipMessage}
    >
      <div className="flex gap-4 items-center w-fit">
        {falseLabel && <span className={clsxm({ 'opacity-25': disabled })}>{falseLabel}</span>}
        <input
          data-testid={`input-${id}`}
          readOnly={readOnly}
          type="checkbox"
          name={id}
          id={id}
          className="peer hidden"
          aria-describedby={id}
          checked={value}
        />
        <div
          onClick={onToggleSwitch}
          className={clsxm(
            {
              'relative w-14 h-7 bg-slate-100 peer-checked:bg-success rounded-full border border-slate-500 cursor-pointer':
                true,
            },
            cursorClassname,
          )}
        />
        {trueLabel && <span className={clsxm({ 'opacity-25': disabled })}>{trueLabel}</span>}
      </div>
    </Group>
  );
};
