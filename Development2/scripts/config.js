/**
 * HOMER - Responsive Admin Theme
 * version 1.8
 *
 */

function configState($stateProvider, $urlRouterProvider, $compileProvider, $provide) {


    $provide.decorator('$document', function($delegate){

        $delegate.getReferrer = function() {return document.referrer;};

        // alternative you can create a property
        // Object.defineProperty($delegate, 'referrer', {
        //   get: function() { return document.referrer; }
        // });

        return $delegate;
    });


    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(true);

    //$urlRouterProvider.otherwise('/searchjobs');

    // Set default state
    $urlRouterProvider.otherwise( function($injector) {
        var $state = $injector.get("$state");
        $state.go('searchjobs');
    });

    $stateProvider
    // Dashboard - Main page
        .state('test', {
            url: "/test",
            templateUrl: "views/Test.html",
            data: {
                pageTitle: 'Test'
            }
        })

        // Dashboard - Main page
        .state('dashboard', {
            url: "/dashboard?jobId&resumeId&messageshow",
            templateUrl: "views/dashboard.html",
            data: {
                pageTitle: 'Dashboard',
                params: {
                    jobId: { squash: true},
                    resumeId: { squash: true},
                    messageshow: { squash: true},
                }
            }
        })

        .state('logout', {
            url: "/logout",
            controller: function($state, $rootScope, AuthService) {
                AuthService.logOut();
                $state.go('login');
            },
            data: {
                pageTitle: 'logout'
                /*permissions: {
                 only: ['Admin', 'User'],
                 redirectTo: 'login'
                 }*/
            }
        })

        // Searchprojects
        .state('searchjobs', {
            url: "/searchjobs",
            templateUrl: "views/searchjobs.html",
            data: {
                pageTitle: 'Search Jobs',
                permissions: {
                    except: ['Admin'],
                    redirectTo: 'dashboard'
                }
            }
            //,
            //resolve: {
            //    factory: checkRouting
            //}
        })

        // Jobmanagement
        .state('jobmanagement', {
            url: "/jobmanagement/:id",
            templateUrl: "views/jobmanagement.html",
            data: {
                pageTitle: 'Job Management',
                permissions: {
                    only: ['Admin'],
                    //   redirectTo: 'login'
                }
            }
        })

        // Jobslist
        .state('jobslist', {
            url: "/jobslist",
            templateUrl: "views/jobslist.html",
            data: {
                pageTitle: 'Jobs List',
                permissions: {
                    only: ['Admin'],
                    //   redirectTo: 'login'
                }
            }
        })

        // Login
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            data: {
                pageTitle: 'Login'
            }
        })

        .state('associate', {
            url: "/associate",
            templateUrl: "views/associate.html",
            data: {
                pageTitle: 'Associate'
            }
        })

        // Register
        .state('register', {
            url: "/register",
            templateUrl: "views/login.html",
            data: {
                pageTitle: 'Register'
            }
        })

        // Register
        .state('viewjobdetails', {
            url: "/viewjobdetails?id&referral&type",
            templateUrl: "views/viewjobdetails.html",
            data: {
                pageTitle: 'Job Details'
            },
            params: {
                id: {squash: true},
                referral: { squash: true},
                type: { squash: true}
            }
            //, resolve: {
            //    factory: checkRouting
            //}
        })

        // ApplyJob
        .state('applyjob', {
            url: "/applyjob",
            templateUrl: "views/applyjob.html",
            data: {
                pageTitle: 'Apply Job',
                permissions: {
                    only: ['User'],
                    //  redirectTo: 'login'
                }
            }
        })

        .state('applicants', {
            url: "/applicants/:id?resumeId&messageshow",
            templateUrl: "views/applicants.html",
            data: {
                pageTitle: 'Applicants',
                params: {
                    resumeId: { squash: true},
                    messageshow: { squash: true},
                }
            }
        })

        //Search resumes home
        .state('searchresumeshome', {
            url: "/searchresumeshome",
            templateUrl: "views/SearchResumesHome.html",
            data: {
                pageTitle: 'Search Resumes Home',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        //Search resumes
        .state('searchresumes', {
            url: "/searchresumes",
            templateUrl: "views/SearchResumes.html",
            data: {
                pageTitle: 'Search Resumes',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('resetpassword', {
            url: "/resetpassword",
            templateUrl: "views/resetpassword.html",
            data: {
                pageTitle: 'Reset password'
            }
        })

        .state('resetpasswordverify', {
            url: "/resetpasswordverify",
            templateUrl: "views/resetpasswordverify.html",
            data: {
                pageTitle: 'Change password'
            }
        })

        .state('screenings', {
            url: "/screenings",
            templateUrl: "views/Screenings.html",
            data: {
                pageTitle: 'Screenings',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('createscreening', {
            url: "/screenings/create",
            templateUrl: "views/CreateScreening.html",
            data: {
                pageTitle: 'Create Screening',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('editscreening', {
            url: "/screenings/:id/edit",
            templateUrl: "views/EditScreening.html",
            data: {
                pageTitle: 'Edit Screening',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('editscreeninginfo', {
            url: "/screenings/:id/info/edit",
            templateUrl: "views/CreateScreening.html",
            data: {
                pageTitle: 'Edit Screening Info',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('createscreeningquestion', {
            url: "/screenings/:id/questions/create",
            templateUrl: "views/CreateScreeningQuestion.html",
            params: {
                'type': 'createscreening',
            },
            data: {
                pageTitle: 'Create Screening Question',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('editscreeningquestion', {
            url: "/screenings/:id/questions/:questionId/edit",
            templateUrl: "views/CreateScreeningQuestion.html",
            params: {
                'type': 'createscreening',
            },
            data: {
                pageTitle: 'Edit Screening Question',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('starttestscreening', {
            url: "/jobs/:jobId/resumes/:id/screenings/:screeningId/start",
            templateUrl: "views/StartTestScreening.html",
            data: {
                pageTitle: 'Start screening tests',
                //permissions: {
                //    only: ['User'],
                //}
            }
        })

        .state('testscreening', {
            url: "/jobs/:jobId/resumes/:id/screenings/:screeningId/test",
            templateUrl: "views/TestScreening.html",
            data: {
                pageTitle: 'Screening test',
                permissions: {
                    only: ['User'],
                }
            }
        })

        .state('finishtestscreening', {
            url: "/resumes/screenings/finish",
            templateUrl: "views/FinishTestScreening.html",
            data: {
                pageTitle: 'Finish screening tests',
                permissions: {
                    only: ['User'],
                }
            }
        })

        .state('resumes', {
            url: "/resumes",
            templateUrl: "views/Resumes.html",
            data: {
                pageTitle: 'Resumes',
                permissions: {
                    only: ['User'],
                }
            }
        })

        .state('referrals', {
            url: "/references",
            templateUrl: "views/Referrals.html",
            data: {
                pageTitle: 'References',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('createreferral', {
            url: "/references/create",
            templateUrl: "views/CreateReferral.html",
            data: {
                pageTitle: 'Create Reference',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('editreferral', {
            url: "/references/:id/edit",
            templateUrl: "views/EditReferral.html",
            data: {
                pageTitle: 'Edit Reference',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('editreferralinfo', {
            url: "/references/:id/info/edit",
            templateUrl: "views/CreateReferral.html",
            data: {
                pageTitle: 'Edit Reference Info',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('createreferralquestion', {
            url: "/references/:id/questions/create",
            templateUrl: "views/CreateReferralQuestion.html",
            params: {
                'type': 'createreferral',
            },
            data: {
                pageTitle: 'Create Reference Question',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('editreferralquestion', {
            url: "/references/:id/questions/:questionId/edit",
            templateUrl: "views/CreateReferralQuestion.html",
            params: {
                'type': 'createreferral',
            },
            data: {
                pageTitle: 'Edit Reference Question',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('download_resume', {
            url: "/download_resume/:id",
            templateUrl: "views/DownloadResume.html",
            data: {
                pageTitle: 'Download resume',
                permissions: {
                    only: ['Admin', 'User'],
                    redirectTo: 'login'
                }
            }
        })

        .state('assignscreening', {
            url: "/screenings/:id/assign",
            templateUrl: "views/ScreeningAssign.html",
            data: {
                pageTitle: 'Screening Assign',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('assignreferral', {
            url: "/references/:id/assign",
            templateUrl: "views/ReferralAssign.html",
            data: {
                pageTitle: 'Reference Assign',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('starttestjobreferral', {
            url: "/jobs/:jobId/resumes/:resumeId/references/:jobReferralId/start?reference_friend_id",
            templateUrl: "views/StartTestJobReferral.html",
            params: {
                reference_friend_id: { squash: true},
                userName: ''
            },
            data: {
                pageTitle: 'Start references tests',
                //permissions: {
                //    only: ['User'],
                //}
            }
        })

        .state('testsjobreferral', {
            url: "/jobs/:jobId/resumes/:resumeId/references/:jobReferralId/test",
            templateUrl: "views/TestJobReferral.html",
            data: {
                pageTitle: 'Reference test',
                permissions: {
                    only: ['User'],
                }
            }
        })

        .state('finishestsjobreferral', {
            url: "/jobs/:jobId/resumes/:resumeId/references/:jobReferralId/test/finish",
            templateUrl: "views/FinishTestJobReferral.html",
            data: {
                pageTitle: 'Finish test reference',
                permissions: {
                    only: ['User'],
                }
            }
        })

        .state('traitify', {
            url: "/jobs/:jobId/resumes/:resumeId/traitify/:traitifyId/test",
            templateUrl: "views/Traitify.html",
            data: {
                pageTitle: 'Traitify test',
                permissions: {
                    only: ['User'],
                }
            }
        })

        .state('traitifystart', {
            url: "/jobs/:jobId/resumes/:resumeId/traitify/:traitifyId/start",
            templateUrl: "views/TraitifyStart.html",
            data: {
                pageTitle: 'Traitify start test',
                //permissions: {
                //    only: ['User'],
                //}
            }
        })

        .state('traitifyfinish', {
            url: "/jobs/:jobId/resumes/:resumeId/traitify/:traitifyId/finish",
            templateUrl: "views/TraitifyFinish.html",
            data: {
                pageTitle: 'Traitify finish test',
                permissions: {
                    only: ['User'],
                }
            }
        })

        .state('interviews', {
            url: "/interviews",
            templateUrl: "views/Interviews.html",
            data: {
                pageTitle: 'Interviews',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('createinterview', {
            url: "/interviews/create",
            templateUrl: "views/CreateInterview.html",
            data: {
                pageTitle: 'Create Interview',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('editinterview', {
            url: "/interviews/:id/edit",
            templateUrl: "views/EditInterview.html",
            data: {
                pageTitle: 'Edit Interview',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('editinterviewinfo', {
            url: "/interviews/:id/info/edit",
            templateUrl: "views/CreateInterview.html",
            data: {
                pageTitle: 'Edit Interview Info',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('createinterviewquestion', {
            url: "/interviews/:id/questions/create",
            templateUrl: "views/CreateInterviewQuestion.html",
            params: {
                'type': 'createinterview',
            },
            data: {
                pageTitle: 'Create Interview Question',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('editinterviewquestion', {
            url: "/interviews/:id/questions/:questionId/edit",
            templateUrl: "views/CreateInterviewQuestion.html",
            params: {
                'type': 'createinterview',
            },
            data: {
                pageTitle: 'Edit Interview Question',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('assigninterview', {
            url: "/interviews/:id/assign",
            templateUrl: "views/InterviewAssign.html",
            data: {
                pageTitle: 'Interview Assign',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('testinterview', {
            url: "/jobs/:jobId/resumes/:resumeId/interviews/:interviewId/test",
            templateUrl: "views/TestInterview.html",
            data: {
                pageTitle: 'Interview test',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        // Clients
        .state('clients', {
            url: "/clients",
            templateUrl: "views/Clients.html",
            data: {
                pageTitle: 'Clients',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        // Create Client
        .state('createclient', {
            url: "/clients/create",
            templateUrl: "views/CreateClient.html",
            data: {
                pageTitle: 'Create Client',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        // Edit Client
        .state('editclient', {
            url: "/clients/:id/edit",
            templateUrl: "views/CreateClient.html",
            data: {
                pageTitle: 'Edit Client',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('bulkemails', {
            url: "/messages/bulk",
            templateUrl: "views/MessagesBulk.html",
            data: {
                pageTitle: 'Bulk Message',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

}

angular
    .module('Jobsite')
    .config(configState)
    .run(function($rootScope, $state, editableOptions, Permission, ValiDatedTokenObject, AuthService) {

        $rootScope.numberWithCommas = function (x) {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        }

        AuthService.fillAuthData();

        $rootScope.$state = $state;
        editableOptions.theme = 'bs3';

        // Define anonymous role
        Permission.defineRole('anonymous', function (stateParams) {
                if (!sessionStorage.getItem("ValiDatedTokenObject"))
                {
                    return true;
                }

                ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
                if (!ValiDatedTokenObject.getValiDatedTokenObject())
                {
                    return true;
                }
                return false;
            })
            .defineRole('User', function (stateParams) {
                if (!sessionStorage.getItem("ValiDatedTokenObject"))
                {
                    return false;
                }

                ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
                if (ValiDatedTokenObject.getValiDatedTokenObject())
                {
                    var role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
                    if(role == 'User') {
                        return true;
                    }
                }
                return false;
            })
            .defineRole('Admin', function (stateParams) {
                if (!sessionStorage.getItem("ValiDatedTokenObject"))
                {
                    return false;
                }
                ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
                if (ValiDatedTokenObject.getValiDatedTokenObject())
                {
                    var role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
                    if(role == 'Admin') {
                        return true;
                    }
                }
                return false;
            });

    });

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null
}