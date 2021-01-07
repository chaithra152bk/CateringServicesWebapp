import constant from "../../shared/constant";

const Routes = (t) => {return {
    recruiter :[{
        path: constant.RECRUITER_DASHBOARD,
        name: t('common.dasboard'),
        icon: "fa fa-tachometer"
    },
    {
        path: constant.RECRUITER_PROFILE_EDIT_SCREEN,
        name: t('navigation.profile'),
        icon: "fa fa-pencil-square-o"
    },
    {
        path: constant.RECRUITER_CANDIDATE_SEARCH_SCREEN,
        name: t('common.people_search'),
        icon: "fa fa-search"
    },
    {
        path: constant.RECRUITER_POST_JOB_SCREEN,
        name: t('navigation.post_job'),
        icon: "fa fa-tasks"
    },
    {
        path: constant.JOB_LIST_SCREEN,
        name: t('navigation.jobs_posted'),
        icon: "fa fa-list-alt"
    },
    {
        operation: constant.SEND_MAIL, 
        name: t('navigation.send_mail'),
        icon: "fa fa-envelope"
    },
    
    ],
    candidate :[ {
        path: constant.CANDIDATE_PROFILE_EDIT_SCREEN,
        name: t('navigation.profile'),
        icon: "fa fa-pencil-square-o"
    }, 
    {
        path: constant.SEARCH_SCREEN,
        name: t('common.job_search'),
        icon: "fa fa-search"
    },
    {
        path: constant.CANDIDATE_APPLIED_JOBS_SCREEN,
        name: t('navigation.job_applied'),
        icon: "fa fa-history"
    },
    {
        path: constant.CANDIDATE_SEARCH_SCREEN,
        name: t('common.people_search'),
        icon: "fa fa-search"
    }, 
    ],
    common :[{
        path: constant.USER_SETTINGS,
        name: t('navigation.settings'),
        icon: "fa fa-sliders"
    },
    // {
    //     path: constant.CHANGE_PASSWORD_SCREEN,
    //     name: t('navigation.change_password'),
    //     icon: "fa fa-key"
    // },
    {
        operation: constant.LOGOUT, 
        name: t('navigation.logout'),
        icon: "fa fa-sign-out"
    }],
}};


export default Routes;

