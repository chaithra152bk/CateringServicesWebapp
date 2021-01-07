import React from "react";
import { connect } from 'react-redux';
import Notification from '../notification/Notification';
import constant from "../../../shared/constant";
import SelectDropdown from "../../select/SelectDropdown";
import * as lookupActions from "../../../saga/lookup-saga";
import { languageLookupData } from "../../../LookupData/languageSpoken";
import { industryLookupData } from "../../../LookupData/industry";
import { countryLookupData } from "../../../LookupData/country";

const toast = new Notification()

class LookupDropdown extends React.Component {

    constructor(props) {
        super(props)
        const { selectedLookups, lookup, t } = props;
        this.lookupIds = [];
        this.state = {
            lookup: lookup || '',
            lookupsData: []
        }
    }

    componentDidUpdate() {
        const { selectedLookups, t } = this.props;
        const lookupsData = selectedLookups || [];
        lookupsData.map((item) => {
            if (!this.lookupIds.includes(item.id))
                this.lookupIds.push(item.id)
        })
    }

    handleFetchLookupCallback = async (text) => {
        const { dispatch, lookupListName, searchAllCountries, t } = this.props;

        switch (lookupListName) {

            case 'industryList':
                if (text.length >= 2) {
                    this.setState({ lookupsData: await industryLookupData(t).industry });
                }
                break;

                case 'skillList':
                    return text.length > 0 && text != ' ' && dispatch(lookupActions.getSkillsRequest(encodeURIComponent(text)));

            case 'languageList':
                if (text.length >= 2) {
                    this.setState({ lookupsData: await languageLookupData(t).languageSpoken });
                }
                break;

            case 'countryList':
                if (text.length >= 2) {
                    this.setState({ lookupsData: await countryLookupData(t).country });
                }
                break;
                
            default:
                return text.length >= 2 && dispatch(lookupActions.getLocationRequest(text, searchAllCountries));
        }
    }


    onMenuOpenCallback = () => {
        const { lookupListName } = this.props
        this.setState({ lookupsData: [] });
    }

    LookupListSelectDropdown = () => {
        const { lookupData, t, label, placeholder, lookupListName, singleSelect } = this.props;
        const { lookup } = this.state;
        const lookupList = lookupListName ? lookupData.get(lookupListName) : lookupData.get("locationList");
        let lookupModifiedData = lookupListName == constant.LOCATION_LIST || lookupListName == constant.SKILL_LIST ? lookupList : this.state.lookupsData;
        
        return (
            <SelectDropdown
                onMenuOpen={this.onMenuOpenCallback}
                singleSelect={singleSelect}
                placeholder={placeholder || label}
                onChange={value => this.onChangeLookupCallback(value)}
                handleFetch={this.handleFetchLookupCallback}
                list={lookupModifiedData}
                initialValue={lookup}
            />
        );
    };

    onChangeLookupCallback = (data) => {
        const { t, selectLookup, label, noValidation } = this.props;
        if (!this.lookupIds.includes(data.id) || noValidation) {
            selectLookup(data, this.lookupIds);
            this.lookupIds.push(data.id);
        }
        else {
            toast.show(
                t("notification.already_exist", { name: label }),
                constant.error
            );
        }
    };

    showSelectedItemSet = (items, lookupListName) => {
        const { t } = this.props;
        return (
            <div className="mtminus10">
                <div className="paid-candidate-box-extra">
                    <ul>
                        {items.map((item, i) => {
                            return (
                                <li className="mrg2" key={i}>
                                    {lookupListName == constant.INDUSTRY_LIST ? t('industry_lookup.industry_' + item.id) : 
                                    lookupListName == constant.LANGUAGE_LIST ? t('language_lookup.language_' + item.id) :
                                    lookupListName == constant.COUNTRY_LIST ? t('country_lookup.country_' + item.id)                                    
                                     : item.label}
                                    &nbsp;&nbsp;
                                    <i
                                        onClick={() => {
                                            this.handleRemove(items, item.id);
                                        }}
                                        className="fa fa-times cursor-pointer"
                                        aria-hidden="true"
                                    ></i>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    };

    handleRemove = (items, removeId, ) => {
        const { removeLookup } = this.props
        const newData = items.filter((item, i) => {
            return item.id != removeId;
        });
        removeLookup(newData)
        this.removeLookup(newData, removeId);
    };

    removeLookup = (newData, removeId) => {
        const index = this.lookupIds.indexOf(removeId);
        if (index > -1) {
            this.lookupIds.splice(index, 1);
        }
    };

    LookupSection = item => {
        const { touched, errors, selectedLookups, lookupListName, t, icon, noIcon, selectClass, lookupWidth } = this.props;

        return (
            <React.Fragment>
                <div className={`input-group ${lookupWidth && lookupWidth} ${selectClass}`} style={noIcon && { width: '100%' }}>
                    {!noIcon && <span className="input-group-addon">
                        <i className={`fa ${icon ? icon : 'fa-map-marker'}`}></i>
                    </span>}
                    {this.LookupListSelectDropdown()}
                </div>
                {selectedLookups && selectedLookups.length > 0 &&
                    this.showSelectedItemSet(selectedLookups, lookupListName)}
            </React.Fragment>
        );
    };

    render() {
        return (
            this.LookupSection()
        );
    }
}

const mapStateToProps = state => ({
    lookupData: state.lookupData
});

export default connect(mapStateToProps)(LookupDropdown);

