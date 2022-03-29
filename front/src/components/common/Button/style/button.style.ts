export type ButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type ButtonVariant = 'normal' | 'outlined' | 'ghost';
export type ButtonColor = 'primary' | 'secondary';
export type IconPosition = 'left' | 'right';

type ClassesType = {
  classes?: { [key: string]: boolean };
};

type IButtonStyle = {
  disabled: ClassesType;
  type: {
    [key in ButtonVariant]?: {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      [key in ButtonColor]?: ClassesType;
    } & ClassesType;
  };
  size: {
    [key in ButtonSize]: ClassesType;
  };
  iconPosition: {
    [key in IconPosition]: ClassesType;
  };
} & ClassesType;

const styleManager: IButtonStyle = {
  classes: {
    'inline-flex': true,
    'items-center': true,
    border: true,
    'font-medium': true,
    rounded: true,
    'shadow-sm': true,
    'focus:outline-none': true,
    'focus:ring-2': true,
    'focus:ring-offset-2': true,
    'focus:ring-primary-500': true,
  },
  disabled: {
    classes: {
      'disabled:opacity-60': true,
      'disabled:cursor-not-allowed': true,
      'disabled:shadow-none': true,
    },
  },
  iconPosition: {
    left: {
      classes: {
        'flex-row-reverse': true,
      },
    },
    right: {
      classes: {
        flex: true,
        'flex-row': true,
      },
    },
  },
  size: {
    xs: {
      classes: {
        'px-2.5': true,
        'py-1.5': true,
        'text-xs': true,
      },
    },
    sm: {
      classes: {
        'px-3': true,
        'py-2': true,
        'text-sm': true,
      },
    },
    base: {
      classes: {
        'px-4': true,
        'py-2': true,
        'text-sm': true,
      },
    },
    lg: {
      classes: {
        'px-4': true,
        'py-2': true,
        'text-base': true,
      },
    },
    xl: {
      classes: {
        'px-base': true,
        'py-3': true,
        'text-base': true,
      },
    },
  },
  type: {
    normal: {
      classes: {
        'text-white': true,
        'border-transparent': true,
      },
      primary: {
        classes: {
          'bg-primary-600': true,
          'hover:bg-primary-700': true,
          'disabled:bg-primary-600': true,
        },
      },
      secondary: {
        classes: {
          'bg-secondary-600': true,
          'hover:bg-secondary-700': true,
          'disabled:bg-secondary-600': true,
        },
      },
    },
    outlined: {
      classes: {
        'bg-white': true,
        'hover:text-white': true,
        'disabled:bg-white': true,
      },
      primary: {
        classes: {
          'text-primary-600': true,
          'border-primary-600': true,
          'hover:bg-primary-600': true,
          'disabled:text-primary-600': true,
        },
      },
      secondary: {
        classes: {
          'text-secondary-600': true,
          'border-secondary-600': true,
          'hover:bg-secondary-600': true,
          'disabled:text-secondary-600': true,
        },
      },
    },
    ghost: {
      classes: {
        'bg-transparent': true,
        'border-transparent': true,
        'shadow-sm': false,
        border: false,
      },
      primary: {
        classes: {
          'text-primary-600': true,
          'hover:text-primary-700': true,
          'disabled:text-primary-600': true,
        },
      },
      secondary: {
        classes: {
          'text-secondary-600': true,
          'hover:text-secondary-700': true,
          'disabled:text-secondary-600': true,
        },
      },
    },
  },
} as const;

interface IGetButtonStyleOptions {
  variant: ButtonVariant;
  color: ButtonColor;
  size: ButtonSize;
  iconPosition: IconPosition;
  disabled: boolean;
}

export const getButtonStyle = ({
  variant,
  color,
  size,
  iconPosition,
  disabled,
}: IGetButtonStyleOptions): { [key: string]: boolean } => {
  return {
    ...styleManager.classes,
    ...styleManager.type[variant]?.classes,
    ...styleManager.size[size].classes,
    ...styleManager.iconPosition[iconPosition].classes,
    ...styleManager.type[variant]?.[color]?.classes,
    ...(disabled ? styleManager.disabled.classes : {}),
  };
};
