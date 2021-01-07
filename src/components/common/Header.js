import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as translation from "../../actions/action-translation";
import flag from "../../resources/flag";
import * as moment from "../../utils/helper/moment";
import Steppers from './steppers/Steppers';
import constant from '../../shared/constant';
// import { Box } from '@material-ui/core';

class Header extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div className="noprint">
                {/* <Box display="flex" alignItems="flex-start" >
                    <Box flexGrow={1}>
                        <Steppers steps={this.props.steps} activeStep={this.props.activeStep}/>
                    </Box>
                    <Box pt={2.5}>
                        <img className="flag-navigation" alt={t('navigation.english_language')} title={t('navigation.english_language')} onClick={() => this.props.changeLanguage(constant.englishLanguageCode)} src={flag.england} />
                    </Box>
                    <Box pt={2.5}>
                        <img className="flag-navigation" alt={t('navigation.german_language')} title={t('navigation.german_language')} onClick={() => this.props.changeLanguage(constant.germanLanguageCode)} src={flag.german} />
                    </Box>
                </Box> */}
            </div>
        );

    }
}

export default Header;