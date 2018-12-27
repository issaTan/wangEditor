/*
    menu - fullscreen
*/
import $ from '../../util/dom-core.js'

// 构造函数
function FullScreen(editor) {
    this.editor = editor
    this.$elem = $(
    `<div class="w-e-menu">
            <i class="fa fa-arrows-alt"></i>
        </div>`
  )
    this.type = 'toggle'

  // 当前是否 active 状态
    this._active = false
}

// 原型
FullScreen.prototype = {
    constructor: FullScreen,

    onClick: function () {
        const editor = this.editor
        const toolbarSelector = editor.toolbarSelector
        const textSelector = editor.textSelector
        let $parent
        if (textSelector == null) {
            $parent = $(toolbarSelector)
        } else {
            $parent = $(toolbarSelector).parent()
        }
        if (!this._active) {
            $parent.addClass('w-e-fullscreen-editor')
            this._active = true
            return
        }
        $parent.removeClass('w-e-fullscreen-editor')
        this._active = false
    }
}

export default FullScreen