Page({
    data: {
        licNo: '',
        name: '',
        genderIndex: 0,
        genders: ['未知', '男', '女', '其他'],
        birthDate: '1990-01-01',
        licImgURL: undefined as string | undefined,
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
            genderIndex: e.detail.value,
        })
    },

    onBirthDateChange(e: any) {
        this.setData({
            birthDate: e.detail.value,
        })
    },
})