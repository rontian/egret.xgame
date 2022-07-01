/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/
/// <reference path="./ui/interfaces/IUIManager.ts" />
/// <reference path="./ui/interfaces/IUIManagerInternal.ts" />

module egretx {
    export class EgretProvider extends xgame.XObject implements xgame.IServiceProvider {
        public constructor(private main: egret.DisplayObjectContainer) {
            super();
        }
        public priority: number = 100;
        public async onInit(game: xgame.IXGame): Promise<boolean> {
            return true;
        }
        public async onStart(game: xgame.IXGame): Promise<boolean> {
            game.getService<IHttpManagerInternal>(IHttpManagerInternal).initialize();
            game.getService<ISocketManagerInternal>(ISocketManagerInternal).initialize();
            game.getService<IUIManagerInternal>(IUIManagerInternal).initialize();
            game.getService<ITouchManagerInternal>(ITouchManagerInternal).initialize();
            return true;
        }
        public onServiceRegister(game: xgame.IXGame): void {
            game.singleton(IHttpManager, HttpManager).withInstance(HttpManager.Instance()).setAlias(IHttpManagerInternal);;
            game.singleton(ISocketManager, SocketManager).withInstance(SocketManager.Instance()).setAlias(ISocketManagerInternal);;
            game.singleton(IUIManager, UIManager).withInstance(new UIManager(this.main)).setAlias(IUIManagerInternal);
            game.singleton(ITouchManager, TouchManager).withInstance(new TouchManager(this.main)).setAlias(ITouchManagerInternal);
        }
    }
}