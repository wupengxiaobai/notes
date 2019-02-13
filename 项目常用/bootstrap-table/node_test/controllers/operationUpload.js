module.exports = {
  //  上传头像
  upLoadAvatar: async (ctx) => {
    const filename = 'avatar/' + ctx.req.file.filename;
    ctx.body = {
      errCode: 0,
      data: {
        msg: '头像上传成功',
        imgLink: filename
      }
    };
  }
};