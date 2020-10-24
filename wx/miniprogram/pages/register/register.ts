import { ProfileService } from "../../service/profile"
import { rental } from "../../service/proto_gen/rental/rental_pb"
import { padString } from "../../utils/format"
import { routing } from "../../utils/routing"

function formatDate(millis: number) {
    const dt = new Date(millis)
    const y = dt.getFullYear()
    const m = dt.getMonth() + 1
    const d = dt.getDate()
    return `${padString(y)}-${padString(m)}-${padString(d)}`
}

Page({
    redirectURL: '',
    profileRefresher: 0,

    data: {
        licNo: '',
        name: '',
        genderIndex: 0,
        genders: ['未知', '男', '女', '其他'],
        birthDate: '1990-01-01',
        licImgURL: '',
        state: rental.v1.IdentityStatus[rental.v1.IdentityStatus.UNSUBMITTED],
    },

    renderProfile(p: rental.v1.IProfile) {
        this.setData({
            licNo: p.identity?.licNumber||'',
            name: p.identity?.name||'',
            genderIndex: p.identity?.gender||0,
            birthDate: formatDate(p.identity?.birthDateMillis||0),
            state: rental.v1.IdentityStatus[p.identityStatus||0],
        })
    },

    onLoad(opt: Record<'redirect', string>) {
        const o: routing.RegisterOpts = opt
        if(o.redirect) {
            this.redirectURL = decodeURIComponent(o.redirect)
        }
        ProfileService.getProfile().then(p => this.renderProfile(p))
    },

    onUploadLic() {
        wx.chooseImage({
            success: res => {
                if (res.tempFilePaths.length > 0) {
                    this.setData({
                        licImgURL: res.tempFilePaths[0]
                    })
                    // TODO: upload image
                    setTimeout(() => {
                        this.setData({
                            licNo: '3252452345',
                            name: '张三',
                            genderIndex: 1,
                            birthDate: '1989-12-02',
                        })
                    }, 1000)
                }
            }
        })
    },

    onGenderChange(e: any) {
        this.setData({
            genderIndex: parseInt(e.detail.value),
        })
    },

    onBirthDateChange(e: any) {
        this.setData({
            birthDate: e.detail.value,
        })
    },

    onSubmit() {
        ProfileService.submitProfile({
            licNumber: this.data.licNo,
            name: this.data.name,
            gender: this.data.genderIndex,
            birthDateMillis: Date.parse(this.data.birthDate),
        }).then(p => {
            this.renderProfile(p)
            this.scheduleProfileRefresher()
        })
    },

    onUnload() {
        this.clearProfileRefresher()
    },

    scheduleProfileRefresher() {
        this.profileRefresher = setInterval(() => {
            ProfileService.getProfile().then(p => {
                this.renderProfile(p)
                if (p.identityStatus !== rental.v1.IdentityStatus.PENDING) {
                    this.clearProfileRefresher()
                }
                if (p.identityStatus === rental.v1.IdentityStatus.VERIFIED) {
                    this.onLicVerified()
                }
            })
        }, 1000)
    },

    clearProfileRefresher() {
        if (this.profileRefresher) {
            clearInterval(this.profileRefresher)
            this.profileRefresher = 0
        }
    },

    onResubmit() {
        ProfileService.clearProfile().then(p => this.renderProfile(p))
    },

    onLicVerified() {
        if (this.redirectURL) {
            wx.redirectTo({
                url: this.redirectURL,
            })
        }
    }
})