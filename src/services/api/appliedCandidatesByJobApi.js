import config from '../config';
import fetchJson from './utils/fetchJson';
import constant from "../../shared/constant";

export const fetchCandidatesAppliedByJob = (jobId) => {
    return fetchJson(
        `${config.apiBaseUrl}/recruiter/jobs/${jobId}/candidates`
    );
};

export const downloadAttachment= (jobId) => {
    return fetchJson(`${config.apiBaseUrl}/candidate/jobs/attachment/${jobId}`, {}, constant.DOWNLOAD_ATTACHMENT);
}