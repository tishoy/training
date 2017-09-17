const Language = {
    Chin: {
        Lang: {
            Chin: "中文简体",
            Eng: "英文"
        },
        pages: {
            main: {
                company_title: "企业信息",
                student_title: "学员信息",
                enrolled_title: "报名信息",
                exam_title: "考试成绩",
                input_your_account: "输入账号",
                account: "账号",
                password: "密码",
                repeat_password: "密码确认",
                input_your_password: "输入密码",
                change_account: "切换账号",
                login_button: "登录",
                register_button: "注册",
                certain_button: "确定",
                cancel_button: "取消",
                next_step: "跳过",
                pre_step: "上一步",
                login_success: "登陆成功",
                register_success: "注册成功"
            },
            com: {
                home: {
                    title: "首页",
                    arranged: "已安排",
                    enrolled: "已报名",
                    passed: "已通过",
                    trained: "已培训",
                    human: "人次",
                    unarranged_title: "待安排的学员",
                    arranged_title: "已安排的学员",
                    clazz_title: "企业所属地区正在开设班级的",
                    available: "可以使用",
                    being_reroll: "正在重新排队"
                },
                infos: {
                    title: "企业信息",
                    base: {
                        title: "基本信息",

                        company_name: "企业名称",
                        province: "省市地区",
                        qualification: "企业资质"
                    },
                    finance: {
                        title: "财务信息",
                        name: "公司全称",
                        taxpayer_identify: "纳税人识别号",
                        bank: "开户银行",
                        bank_account: "开户行账号",
                        address: "地址",
                        tel: "电话"
                    },
                    express: {
                        title: "邮政信息",
                        express_code: "邮编",
                        express_address: "收件地址",
                        address: "详细地址",
                        express_person: "收件人",
                        contact_way: "联系方式"
                    },
                    admin: {
                        title: "管理员信息",
                        account: "用户名",
                        password: "密码",
                        name: "管理员姓名",
                        tel: "手机",
                        email: "邮箱"
                    }
                },
                students: {
                    title: "学生",
                    list_title: "学员列表",
                    new_student: "新增",
                    del_student: "删除",
                    exam_record: "考试记录",
                    fix_student: "修改",
                    base_infobase_info: "基本信息",
                    name: "姓名",
                    tel: "电话",
                    email: "电子邮件",
                    city: "地区",
                    level: {
                        title: "级别",
                        junior: "初级",
                        medium: "中级",
                        senior: "高级",
                    },

                    personal_info: {
                        title: "个人信息",
                        licence: "身份证号",
                        "edu": "学历",
                        "working_time": "从业时间",
                        "total_amount": "累计项目总金额",
                        "soft_amount": "累计项目软件服务金额"




                    },

                    proj_exp: {
                        title: "项目经历",
                        "id": "",
                        "name": "项目名称",
                        "time": "项目时间",
                        "actor": "担任角色",
                        "total_amount": "项目总额",
                        "soft_amount": "软件和IT服务金额"
                    }







                },
                exams: {
                    title: "考试",
                    examing: "待考试名单",
                    passed: "已通过考试",
                    unpassed: "未通过考试",
                },
                enrolled: {
                    title: "报名",
                    unenrolled: "未报名",
                    unarrange: "待安排",
                    arranged: "已安排",
                },
                card: {
                    modify: "修改",
                    enroll: "报名",
                    agree: "同意",
                    refuse: "拒绝",
                    retry: "重考试",
                    giveup: "放弃",
                    status: {
                        1: "已通过",
                        2: "已拒绝",
                    }
                }
            },
            org: {
                area: "地区",
                arrange_rate: "待安排/已安排",
                classed: "已开班",
                new_class: "添加班级",
                new_service: "添加服务区",

                home: {
                    title: "首页"
                },
                enroll: {
                    title: "报名查看"
                },
                clazz: {
                    title: "班级安排",
                },
                score: {
                    title: "成绩管理",
                    daily_score: "平日成绩",
                    exam_score: "考试成绩",

                },
                area: {
                    title: "服务区域",
                }
            },
        },

        components: {
            AppFrame: {
                ThemeColor: "主题颜色",
                Ligth: "明亮",
                Dark: "灰暗",
                Info: "登录信息",
                Reset: "修改密码",
                Logout: "登出"
            },
            CommonAlert: {
                warning: "警告",
                alert: "提示",
                notice: "通知"
            }
        },
        ErrorCode: {
            0: "操作成功",
            1000: "两次密码不相同",
            1001: "密码不能为空",
            1002: "账号不能为空",
            10001: "账号已被注册",
            10002: "帐号可注册",
            10006: "密码错误"
        }
    },
    Eng: {
        Lang: {
            Chin: "Chinese",
            Eng: "English"
        },
        pages: {
            main: {
                company_title: "Company Detail",
                student_title: "Students Detail",
                enrolled_title: "Enroll Detail",
                exam_title: "Exam Score",
                input_your_account: "Account input",
                account: "Account",
                password: "Password",
                repeat_password: "Repeat password",
                input_your_password: "Password input",
                change_account: "Logout",
                login_button: "Login",
                register_button: "Register",
                certain_button: "OK",
                cancel_button: "Cancel",
                next_step: "Next",
                pre_step: "Previous",
            },
            company: {
                home: {
                    title: "Home",
                    arranged: "Already arrange",
                    enrolled: "Already enroll",
                    passed: "Already pass",
                    trained: "Already train",
                    human: "Numbers",
                    unarranged_title: "待安排的学员",
                    arranged_title: "已安排的学员",
                    clazz_title: "企业所属地区正在开设班级的",
                    available: "可以使用",
                    being_reroll: "正在重新排队"
                },
                infos: {
                    base: {
                        title: "基本信息",

                        company_name: "企业名称",
                        province: "省市地区",
                        qualification: "企业资质"
                    },
                    finance: {
                        title: "财务信息",
                        name: "公司全称",
                        taxpayer_identify: "纳税人识别号",
                        bank: "开户银行",
                        bank_account: "开户行账号",
                        address: "地址",
                        tel: "电话"
                    },
                    express: {
                        title: "邮政信息",
                        express_code: "邮编",
                        express_address: "收件地址",
                        address: "详细地址",
                        express_person: "收件人",
                        contact_way: "联系方式"
                    },
                    admin: {
                        title: "管理员信息",
                        account: "用户名",
                        password: "密码",
                        name: "管理员姓名",
                        tel: "手机",
                        email: "邮箱"
                    }
                },
                students: {
                    list_title: "学员列表",
                    new_student: "新增",
                    del_student: "删除",
                    exam_record: "考试记录",
                    fix_student: "修改",
                    base_infobase_info: "基本信息",
                    name: "姓名",
                    tel: "电话",
                    email: "电子邮件",
                    city: "地区",
                    level: {
                        title: "级别",
                        junior: "初级",
                        medium: "中级",
                        senior: "高级",
                    },

                    personal_info: {
                        title: "个人信息",
                        licence: "身份证号",
                        "edu": "学历",
                        "working_time": "从业时间",
                        "total_amount": "累计项目总金额",
                        "soft_amount": "累计项目软件服务金额"




                    },

                    proj_exp: {
                        title: "项目经历",
                        "id": "",
                        "name": "项目名称",
                        "time": "项目时间",
                        "actor": "担任角色",
                        "total_amount": "项目总额",
                        "soft_amount": "软件和IT服务金额"
                    }







                },
                exams: {
                    title: "考试",
                    examing: "待考试名单",
                    passed: "已通过考试",
                    unpassed: "未通过考试",
                },
                enrolled: {
                    title: "",
                    unenrolled: "未报名",
                    unarrange: "待安排",
                    arranged: "已安排",
                },
                card: {
                    modify: "修改",
                    enroll: "报名",
                    agree: "同意",
                    refuse: "拒绝",
                    retry: "重考试",
                    giveup: "放弃",
                    status: {
                        1: "已通过",
                        2: "已拒绝",
                    }
                }
            },

        },
        orgnization: {
            area: "地区",
            arrange_rate: "待安排/已安排",
            classed: "已开班",
            new_class: "添加班级",
            score: {
                title: "成绩录入",
                daily_score: "平日成绩",
                exam_score: "考试成绩",

            },
            new_service: "添加服务区"
        },
        components: {
            AppFrame: {
                ThemeColor: "主题颜色",
                Ligth: "明亮",
                Dark: "灰暗",
                Info: "登录信息",
                Reset: "修改密码",
                Logout: "登出"
            },
            CommonAlert: {
                warning: "警告",
                alert: "提示",
                notice: "通知"
            }
        },
        ErrorCode: {
            0: "操作成功",
            1000: "两次密码不相同",
            10001: "账号已被注册",
            10002: "帐号可注册",
        }

    }
}
export default Language;