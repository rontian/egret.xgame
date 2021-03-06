/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-10-08
*************************************************/
module fui {
    export enum UIFlags {
        None = 0,
        useMask = 1,
        isStack = 2,
        isFullScreen = 4,
        allowMultiple = 8,
        closeByMask = 16,
        isPopupMenu = 32,
        isPlugin = 64,
        isScene = 128,
        isWindow = 256,
    }
}