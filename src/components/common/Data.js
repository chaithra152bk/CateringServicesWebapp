import constant from "../../shared/constant";

export const Data = (t) => {
    return {
        gender: [
            {
                label: t('common.female'),
                value: constant.FEMALE,
            },
            {
                label: t('common.male'),
                value: constant.MALE,
            },
            {
                label: t('common.other'),
                value: constant.OTHER,
            },
            {
                label: t('common.donot_wish_to_specify'),
                value: constant.DO_NOT_WISHTO_SPECIFY,
            },
        ],
        availabilityList: [
            {
                label: t('candidate_profile.general_interest'),
                value: constant.GENERAL_INTEREST
            },
            {
                label: t('candidate_profile.actively_searching'),
                value: constant.ACTIVELY_SEARCHING
            },
            {
                label: t('candidate_profile.not_searching'),
                value: constant.NOT_SEARCHING
            }
        ],
        YesNo: [
            {
                label: t('common.yes'),
                value: constant.YES,
            },
            {
                label: t('common.no'),
                value: constant.NO,
            }
        ],
        profileVisibility: [
            {
                label: t('common.all_users'),
                value: constant.ALL_USERS,
            },
            {
                label: t('common.recruiters_only'),
                value: constant.RECRUITERS_ONLY,
            },
            {
                label: t('common.invisible'),
                value: constant.INVISIBLE,
            },

        ],
        language: [
              {
                label: t('navigation.english_language'),
                value: constant.ENGLISH_LANGUAGE_CODE,
            },
            {
                label: t('navigation.norway_language'),
                value: constant.NORWAY_LANGUAGE_CODE,
            },
        ],
        degree: [
            {
                label: t('common.high_school'),
                value: constant. HIGHSCHOOL_LEVEL,
            },
            {
                label: t('common.associate_level'),
                value: constant.ASSOCIATE_LEVEL,
            },
            {
                label: t('common.bachelor_level'),
                value: constant.BACHELOR_LEVEL,
            },
            {
                label: t('common.master_level'),
                value: constant.MASTERS_LEVEL,
            },
            {
                label: t('common.phd_above'),
                value: constant.PHD_ABOVE_LEVEL,
            }
        ],
        languageFilterData: [
            {
                label: t('common.english_only'),
                value: constant.ENGLISH_ONLY
            },
            {
                label: t('common.norwegian_only'),
                value: constant.NORWEGIAN_ONLY
            },
            {
                label: t('common.english_and_norwegian'),
                value: constant.ENGLISH_ONLY_AND_NORWEGIAN_ONLY
            },
            {
                label: t('common.others'),
                value: constant.OTHER
            }
        ]
    }
}     
