/*
    menu - source
*/
import $ from '../../util/dom-core.js'

// 构造函数
function Source(editor) {
    this.editor = editor
    this.$elem = $(
    `<div class="w-e-menu">
            <i class="fa fa-code"></i>
        </div>`
  )
    this.type = 'toggle'

  // 当前是否 active 状态
    this._active = false
}

// 原型
Source.prototype = {
    constructor: Source,

    onClick: function () {
        const editor = this.editor
        const toolbarSelector = editor.toolbarSelector
        const textSelector = editor.textSelector
        if (textSelector == null) {
            this.$parent = $(toolbarSelector)
        } else {
            this.$parent = $(toolbarSelector).parent()
        }
        this.$text = this.$parent.find('.w-e-text-container')
        this.$source = this.$parent.find('.w-e-source-container')

        if (!this.$source.length) {
            this._createSource()
        }
        if (!this._active) {
            this._showSource()
            this._active = true
            return
        }
        this._showText()
        this._active = false
    },

  // 创建展示text
    _createSource: function () {
        const editor = this.editor
        const $source = $('<textarea class="w-e-source-container"></textarea>')
        this.$parent.append($source)
        this.$source = this.$parent.find('.w-e-source-container')
        this.$source.on('blur', () => {
            const source = this.$source.val()
            editor.txt.html(source)
            editor.onblur && editor.onblur()
        })
        this.$source.on('focus', () => {
            editor.onfocus && editor.onfocus()
        })
    },

  // 展示源码框
    _showSource: function () {
        const editor = this.editor
        const source = editor.txt.html()
        this.$source.val(source)
        this.$text.hide()
        this.$source.show()
    },

  // 更新代码
    _showText: function () {
        const editor = this.editor
        const source = this.$source.val()
        editor.txt.html(source)
        this.$source.hide()
        this.$text.show()
    }
}

export default Source