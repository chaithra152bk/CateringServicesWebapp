import React, { useState } from 'react';
import * as common from "../../common/common";
import constant from "../../../shared/constant";
import config from '../../../services/config';
import flag from '../../../resources/flag';
import JobDetailContainer from "../../jobDetails/JobDetailContainer";
import SendMailContainer from "../../common/sendMail/sendMailContainer";
import * as moment from "../../../utils/helper/moment";
import * as helper from '../../../utils/helper/helper';
import Collapsible from 'react-collapsible';
import Accordion from "../../common/accordian/Accordian";

export const JobList = (props) => {
    const { jobs, t, listFor } = props;
    const draftJobs = jobs.filter((item) => item.status == constant.DRAFT);
    const pendingApprovalJobs = jobs.filter((item) => item.status == constant.PENDING_APPROVAL);
    const approvedJobs = jobs.filter((item) => item.status == constant.APPROVED);
    const inactiveJobs = jobs.filter((item) => item.status == constant.IN_ACTIVE);
    const [activeTab, setActiveTab] = useState(0);
    const [listHeight, setListHeight] = useState(0);

    function scrollHeightCallback(value){
        setListHeight(value)
    }

    function displayJobList(jobData, dataType) {
        return jobData.map((item, i) => {
            return jobListView(item, i, dataType)
        })
    }

    function modalHeader(title) {
        return <h2 className="detail-title">{title}</h2>
    }

    // applied-jobs screen popup(candidateAppliedJobScreen)
    function ViewAppliedDetails(item) {
        const { t } = props;
        return <section className="full-detail full-details-container">
            <div className="jobDetail-container-popupView">
                <div className="row bottom-mrg extra-mrg">
                    <div className="col-md-12 col-sm-12">
                        <div><h5>{t('common.applied_date_time')}</h5></div>
                        {common.formDisplayText('fa-calendar', item.jobAppliedDateTime != '0001-01-01T00:00:00' ? moment.displayDateAndTime(item.jobAppliedDateTime) : '')}
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <div><h5>{t('common.cover_letter_text')}</h5></div>
                        {common.formDisplayText('fa-list-alt', item.jobAppliedDescription)}
                    </div>
                </div>
            </div>
        </section>
    }
    function ViewAppliedDetailsPopup(item) {
        const { t, modalRef } = props;
        modalRef.props.onHide({ body: ViewAppliedDetails(item), header: modalHeader(t('common.application_details')) })
    }

    function viewJob(item) {
        const { t, modalRef } = props;
        modalRef.props.onHide({ body: <JobDetailContainer {...props} jobData={item} disableShare={true} disableApply={true} />, header: modalHeader(t('common.view')) })
    }

    function inviteToApplySendMail(item) {
        const { t, modalRef, userData } = props;
        let subject = t('common.apply_for_job') + ' ' + t('common.job') + ' ' + ' - ' + ' ' + item.jobTitle + ' ';
        let jobUrl = constant.WEBSITE_URI + constant.JOBS_SCREEN + "/" + item.id;
        let companyName = userData.companyName;
        let mailBodyText = t('common.hi_text') + "\n\n" + t('common.invite_apply_text') + "\n\n" + jobUrl + "\n\n" + "/" + companyName;

        modalRef.props.onHide({
            body: <SendMailContainer modelRef={modalRef} mailSubject={subject} mailBody={mailBodyText} showEmail={true} {...props}
            />,
            header: modalHeader(t('common.invitation_to_apply'))
        })
    }

    function inviteToInterviewSendMail(item) {
        const { t, modalRef, userData } = props;
        let subject = t('common.interview_invitation_for') + ' ' + item.jobTitle + ' ' + t('common.job');
        let jobUrl = constant.WEBSITE_URI + constant.JOBS_SCREEN + "/" + item.id;
        let companyName = userData.companyName;
        let mailBodyText = t('common.hi_text') + "\n\n" + t('common.interview_invitation') + "\n\n" + jobUrl + "\n\n" + "/" + companyName;
        modalRef.props.onHide({
            body: <SendMailContainer modelRef={modalRef}
                mailSubject={subject}
                mailBody={mailBodyText} 
                showEmail={true} {...props}
            />,
            header: modalHeader(t('common.invitation_to_interview'))
        })
    }

    function oppurtunityName(data) {
        const { t } = props;
        return <div className="smallBoxes wrap">{data.map((item, i)=>{
            const { opportunityTypeId } = item;
           return <span key={i} className="cl-success bg-trans-success smallBoxes-item">{t(`opportunity_lookup.opportunity_type_${opportunityTypeId}`)}</span>
        })} 
        </div>
    }

    function jobListView(item, key, dataType) {
        const { t, history, showEditJob, showViewJob, showApplyButton, recentImg, candidateAppliedJobScreen, imageClassName, status } = props;
        let imageClassNameDetail = imageClassName;
        imageClassNameDetail = imageClassName || "img-responsivejob detail";
        const jobLocations = item.jobLocations || [];
        const jobIndustries = item.jobIndustries || [];

        return <div className="item-click" key={key}>
                <div className={"brows-job-list"}>
                    <div className={candidateAppliedJobScreen ? "col-md-9 col-sm-9" : "col-md-10 col-sm-10"}>
                        <div className="item-fl-box">
                            {showApplyButton || candidateAppliedJobScreen ?
                                <div className="brows-job-company-img">
                                    {item.companyLogoUrl ?
                                        <img className={ recentImg ? "random-img": "img-responsivejob detail"} src={`${config.apiBaseUrl}/recruiter/details/profilepicture/${item.companyLogoUrl}`} onClick={() => history.push(`${constant.JOBS_SCREEN}/${item.id}`, item)} />
                                        : <img className={item.id == 0 ? "img-responsivejob detail disabled" : "img-responsivejob detail"} src={flag.defaultLogoImage} onClick={() => history.push(`${constant.JOBS_SCREEN}/${item.id}`, item)} />}
                                </div>
                                : null}
                            {item.id == 0 ? <p className="dark-text profile"><span className="appliedTitle list">{t('empty_messages.no_recruiter_account')}</span> </p> :
                                <div className="brows-job-position">
                                    <h3>
                                        {showApplyButton || candidateAppliedJobScreen ?
                                            <a className="job-title" onClick={() => history.push(`${constant.JOBS_SCREEN}/${item.id}`, item)}>{item.jobTitle}</a>
                                            : <span><a className="job-title">{item.jobTitle}{' ' + ' '}</a></span>}
                                    </h3>
                                    <div>
                                        <span>
                                            {jobLocations.map((item, i) => <span key={i}>{item.locationName}
                                                {i != jobLocations.length - 1 ? ',' + '  ' : '  '}</span>)}</span>
                                        {item.jobOpportunityTypes ? oppurtunityName(item.jobOpportunityTypes) : null}

                                    </div>
                                    <div>
                                        <span>
                                            {jobIndustries.map((item, i) => <span key={i}>
                                                {t('industry_lookup.industry_' + item.industryId)}
                                                {i != jobIndustries.length - 1 ? ',' + '  ' : '  '}</span>)}</span>
                                    </div>
                                    <div>
                                        {item.postedOn && (item.status == constant.APPROVED || item.status == constant.IN_ACTIVE)? <div className="postedOn">
                                            {item.postedOn != '0001-01-01T00:00:00' ? <label>{t('common.posted_on')}  </label> : null}{' '}{' '}
                                            {item.postedOn != '0001-01-01T00:00:00' && (showApplyButton || candidateAppliedJobScreen) ? moment.displayDate(item.postedOn) : moment.displayDateAndTime(item.postedOn)}
                                        </div>
                                            : null}</div>
                                </div>
                            }
                        </div>
                    </div>

                    <div className={candidateAppliedJobScreen ? "col-lg-3 col-md-3 col-sm-3" : "col-lg-2 col-md-2 col-sm-2"}>
                        {showEditJob ?
                            <div className="brows-job-link job-edit-container">

                                <button className="job-detail-buttons" onClick={() => history.push(`${constant.CANDIDATE_APPLIED_JOBS_DETAIL_SCREEN}/${item.id}`, item)}>{t('common.candidate_applied')}</button>
                                {item.status == constant.APPROVED && dataType != constant.IN_ACTIVE ?
                                    <span>
                                        <button className="job-detail-buttons" onClick={() => inviteToApplySendMail(item)}>{t('common.invite_to_apply')}</button>
                                        <button className="job-detail-buttons" onClick={() => inviteToInterviewSendMail(item)}>{t('common.invite_to_interview')}</button>
                                    </span>
                                    : null}

                                <button className="job-detail-buttons" onClick={() => viewJob(item)}
                                >{t('common.view')}</button>
                            </div> : null}
                        {showViewJob ?
                            <div className="brows-job-link job-edit-container">
                                <button className="job-detail-buttons-edit" onClick={() => history.push(`${constant.RECRUITER_POST_JOB_SCREEN}/${item.id}`)}>{t('common.edit')}</button>
                            </div>
                            : null}
                        {showApplyButton ?
                            <div className="brows-job-link job-edit-container">
                                <button onClick={() => history.push(`${constant.JOBS_SCREEN}/${item.id}`, item)} className="job-detail-buttons-edit job">{t('common.view')}</button>
                            </div>
                            : null}

                        {/* applied-jobs screen button(candidateAppliedJobScreen) */}

                        {candidateAppliedJobScreen ?
                            <div className="textCenter"> <button className="job-detail-buttons view view-application-button" onClick={() => ViewAppliedDetailsPopup(item)}>{t('common.view_applied_details')}</button> <p className="appliDate">
                                <label>{t('common.applied_on')} </label> {' '}{' '}
                                {moment.displayDateAndTime(item.jobAppliedDateTime)}
                            </p></div>
                            : null}
                    </div>
                </div>

          
        </div>
    }

    function activateTabCallback(index) {
        if(activeTab != index)
            setActiveTab(index);
        else
            setActiveTab(0)
	}

    return (
        <div style={{minHeight: listHeight}} >

            {listFor == constant.CANDIDATE_ROLE ? displayJobList(jobs) : <>
                {pendingApprovalJobs.length > 0 && <div className="mrg-top-20">
                    <Accordion
                        title={t('common.jobs_in_pending')}
                        content={displayJobList(pendingApprovalJobs)}
                        index={1}
                        activeTab={activeTab}
                        activateTab={ ()=>activateTabCallback(1) }
                        scrollHeight={(value)=>scrollHeightCallback(value)}
                    />
                </div>}

                {approvedJobs.length > 0 && <div className="mrg-top-20">
                <Accordion
                    title={t('common.jobs_approved')}
                    content={displayJobList(approvedJobs)}
                    index={2}
                    activeTab={activeTab}
                    activateTab={ ()=>activateTabCallback(2) }
                    scrollHeight={(value)=>scrollHeightCallback(value)}
                />
                </div>}

                {draftJobs.length > 0 && <div className="mrg-top-20">
                    <Accordion
                        title={t('common.jobs_in_draft')}
                        content={displayJobList(draftJobs)}
                        index={3}
                        activeTab={activeTab}
                        activateTab={ ()=>activateTabCallback(3) }
                        scrollHeight={(value)=>scrollHeightCallback(value)}
                    />
                </div>}

                {inactiveJobs.length > 0 && <div className="mrg-top-20">
                <Accordion
                    title={t('common.inactive_jobs')}
                    content={displayJobList(inactiveJobs)}
                    index={4}
                    activeTab={activeTab}
                    activateTab={ ()=>activateTabCallback(4) }
                    scrollHeight={(value)=>scrollHeightCallback(value)}
                />
                </div>}
            </>}
        </div>
    );

}