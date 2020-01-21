import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBarType, MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import React, { useContext } from 'react';
import { style } from 'typestyle';
import { Overlay } from 'office-ui-fabric-react';
import { ThemeExtended, ThemeContext } from "./../../../app/ThemeContext";

interface StatusMessage {
  message: string;
  level: MessageBarType;
  infoLink?: string;
}

interface ActionBarButtonProps {
  id: string;
  title: string;
  disable: boolean;
  onClick: () => void;
}
interface ActionBarProps {
  id: string;
  primaryButton: ActionBarButtonProps;
  secondaryButton?: ActionBarButtonProps;
  statusMessage?: StatusMessage;
  validating?: boolean;
  overlay?: boolean;
}

const elementWrapperStyle = (theme: ThemeExtended) =>
  style({
    position: 'absolute',
    bottom: '0px',
    height: '57px',
    left: '0px',
    right: '0px',
    overflow: 'hidden',
    borderTop: `1px solid ${theme.colors.citrus}`,
    background: '#ffffff',
    zIndex: 1,
  });

const buttonsWrapperStyle = style({
  display: 'inline-block',
  verticalAlign: 'top',
  paddingTop: '10px',
});

const buttonStyle = (theme: ThemeExtended, isPrimary: boolean) =>
  style({
    marginLeft: '16px',
    marginTop: '2px',
    $nest: {
      '&:focus': {
        $nest: {
          '&::after': {
            top: '1px !important',
            right: '1px !important',
            bottom: '1px !important',
            left: '1px !important',
            borderStyle: 'dotted !important',
            borderColor: `${
              isPrimary ? theme.colors.headerBoxShadow : theme.colors.boxShadow
            } !important`,
            outlineStyle: 'dotted !important',
            outlineColor: `${theme.colors.headerBackground} !important`,
            outlineOffset: '1px !important',
          },
        },
      },
    },
  });

  const statusMessageDiv = style({
    display: 'inline-block',
    marginTop: '5px',
  });

type ActionBarPropsCombined = ActionBarProps;
const ActionBar: React.FC<ActionBarPropsCombined> = props => {
  const theme = useContext(ThemeContext);
  const {  primaryButton, secondaryButton, validating, id, statusMessage, overlay } = props;

  return (
    <div className={elementWrapperStyle(theme)}>
      <div className={buttonsWrapperStyle}>
        <PrimaryButton
          id={`${id}-${primaryButton.id}`}
          className={buttonStyle(theme, true)}
          onClick={primaryButton.onClick}
          disabled={primaryButton.disable}>
          {primaryButton.title}
        </PrimaryButton>
        {secondaryButton && (
          <DefaultButton
            id={`${id}-${secondaryButton.id}`}
            className={buttonStyle(theme, false)}
            onClick={secondaryButton.onClick}
            disabled={secondaryButton.disable}>
            {secondaryButton.title}
          </DefaultButton>
        )}
      </div>
      <div className={statusMessageDiv}>
          {!!statusMessage && (
            <MessageBar
              messageBarType={statusMessage.level}
              isMultiline={false}
              styles={{
                root: {
                  backgroundColor: 'rgba(0, 0, 0, 0.0)',
                },
              }}>
              {statusMessage.message}
            </MessageBar>
          )}
        </div>
      {overlay && <Overlay />}
    </div>
  );
};
export default ActionBar;
