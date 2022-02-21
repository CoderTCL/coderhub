const service = require('../service/comment.service')

class CommentController {
    //1:创建评论
    async create(ctx, next) {
        const {momentId, content} = ctx.request.body;
        const {id} = ctx.user
        await service.create(momentId, content, id)
        ctx.body = {
            status: 200,
            message:'评论发布成功'
        }
    }

    //2:回复某条评论 多了一个评论的id
    async reply(ctx, next) {
        const {momentId, content} = ctx.request.body;
        const {id} = ctx.user
        const {commentId} = ctx.params
        ctx.body = await service.reply(momentId, content, id, commentId)
    }


    //3:修改评论
    async update(ctx, next) {
        const {content} = ctx.request.body;
        const {commentId} = ctx.params
        ctx.body = await service.update(content, commentId)
    }

    //4:删除评论
    async remove(ctx, next) {
        const {commentId} = ctx.params
        ctx.body = await service.remove(commentId)
    }

    //5:根据动态id获取评论列表
    async list(ctx, next) {
        const {momentId} = ctx.query
        ctx.body = await service.getCommentsByMomentId(momentId)
    }
}

module.exports = new CommentController()
