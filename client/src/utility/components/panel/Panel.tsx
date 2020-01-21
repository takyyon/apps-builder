  
import React, { useContext } from 'react';
import { Panel as OfficePanel, IPanelProps, PanelType, Overlay } from 'office-ui-fabric-react';
import { ReactComponent as CloseSvg } from './../../../assets/images/close.svg';
import { panelStyle, panelHeaderStyle, panelBodyStyle, closeButtonStyle } from './Panel.styles';
import { ThemeContext } from './../../../app/ThemeContext';

type IPanelPropsReduced = Pick<IPanelProps, Exclude<keyof IPanelProps, 'styles' | 'closeButtonAriaLabel' | 'onRenderNavigationContent'>>;

interface CustomPanelProps {
    style?: {};
    overlay?: boolean;
}

const Panel: React.SFC<CustomPanelProps & IPanelPropsReduced> = props => {
    const { headerText, isOpen, type, style: customPanelStyle, overlay, ...rest } = props;
    const theme = useContext(ThemeContext);

    let allPanelStyle = panelStyle;

    if (customPanelStyle) {
        allPanelStyle = Object.assign(panelStyle, customPanelStyle);
    }

    const onRenderNavigationContent = panelProps => {
        const onClick = panelProps.onDismiss && (() => panelProps.onDismiss!());
        return (
          <div className={panelHeaderStyle}>
            {headerText && <h3>{headerText}</h3>}
            <CloseSvg onClick={onClick} tabIndex={1} role="button" aria-label='Close' className={closeButtonStyle(theme)} />
          </div>
        );
      };

    return (
        <OfficePanel
          isOpen={isOpen === undefined ? true : isOpen}
          type={type ? type : PanelType.large}
          styles={allPanelStyle}
          onRenderNavigationContent={onRenderNavigationContent}
          {...rest}>
          <div style={panelBodyStyle}>{props.children}</div>
          {overlay && <Overlay />}
        </OfficePanel>
      );
};

export default Panel;