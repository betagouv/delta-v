export type ButtonSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
export type ButtonVariant = 'normal' | 'outlined' | 'ghost';
export type ButtonColor = 'primary' | 'secondary';
export type IconPosition = 'left' | 'right';
export type ButtonRounded = 'full' | 'lg' | 'md' | 'base' | 'none';

type ClassesType = {
  classes?: { [key: string]: boolean };
};

type IButtonStyle = {
  disabled: ClassesType;
  fullWidth: ClassesType;
  notFullWidth: ClassesType;
  rounded: {
    [key in ButtonRounded]: ClassesType;
  } & ClassesType;
  type: {
    [key in ButtonVariant]?: {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      [key in ButtonColor]?: ClassesType;
    } & ClassesType;
  };
  size: {
    [key in ButtonSize]: ClassesType;
  } & ClassesType;
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
    'shadow-sm': true,
    'focus:outline-none': true,
    'place-content-center': true,
  },
  rounded: {
    full: {
      classes: {
        'rounded-full': true,
      },
    },
    lg: {
      classes: {
        'rounded-lg': true,
      },
    },
    md: {
      classes: {
        'rounded-md': true,
      },
    },
    base: {
      classes: {
        rounded: true,
      },
    },
    none: {
      classes: {
        rounded: false,
        'rounded-md': false,
        'rounded-lg': false,
        'rounded-full': false,
      },
    },
  },
  disabled: {
    classes: {
      'disabled:cursor-not-allowed': true,
      'disabled:shadow-none': true,
      'disabled:bg-disabled-bg': true,
      'disabled:text-disabled-text': true,
      'disabled:border-transparent': true,
    },
  },
  fullWidth: {
    classes: {
      'w-full': true,
    },
  },
  notFullWidth: {
    classes: {
      'w-fit': true,
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
    classes: {
      'font-normal': true,
    },
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
        'py-2.5': true,
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
          'active:bg-primary-500': true,
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
        'disabled:bg-white': true,
      },
      primary: {
        classes: {
          'text-primary-600': true,
          'border-primary-600': true,
          'active:bg-gray-300': true,
          'active:text-primary-500': true,
          'active:border-primary-500': true,
          'disabled:text-primary-600': true,
        },
      },
      secondary: {
        classes: {
          'text-secondary-600': true,
          'border-secondary-600': true,
          'active:text-secondary-500': true,
          'active:bg-gray-300': true,
          'active:border-secondary-500': true,
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
  rounded: ButtonRounded;
  disabled: boolean;
  fullWidth: boolean;
}

export const getButtonStyle = ({
  variant,
  color,
  size,
  iconPosition,
  rounded,
  disabled,
  fullWidth,
}: IGetButtonStyleOptions): { [key: string]: boolean } => {
  return {
    ...styleManager.classes,
    ...styleManager.type[variant]?.classes,
    ...styleManager.size.classes,
    ...styleManager.size[size].classes,
    ...styleManager.iconPosition[iconPosition].classes,
    ...styleManager.type[variant]?.[color]?.classes,
    ...styleManager.rounded[rounded].classes,
    ...(disabled ? styleManager.disabled.classes : {}),
    ...(fullWidth ? styleManager.fullWidth.classes : styleManager.notFullWidth.classes),
  };
};
