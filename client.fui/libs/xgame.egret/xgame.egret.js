window.egretx = {};
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
window.__extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

(function (egretx) {
    xgame.XGame.prototype["useEgret"] = function (main) {
        var self = this;
        self.registerServiceProvider(new egretx.EgretProvider(main));
    };
    //================================================
    // Group
    //================================================
    var SBState;
    (function (SBState) {
        SBState[SBState["INVALID"] = 0] = "INVALID";
        SBState[SBState["H_HEAD"] = 1] = "H_HEAD";
        SBState[SBState["H_MID"] = 2] = "H_MID";
        SBState[SBState["H_TAIL"] = 4] = "H_TAIL";
        SBState[SBState["V_HEAD"] = 8] = "V_HEAD";
        SBState[SBState["V_MID"] = 16] = "V_MID";
        SBState[SBState["V_TAIL"] = 32] = "V_TAIL";
    })(SBState = egretx.SBState || (egretx.SBState = {}));
    eui.Group.prototype["onResizeChanged"] = function () {
        var self = this;
        var listener = self.__callback_onResize__;
        if (!listener) {
            listener = new xgame.Signal0();
            self.__callback_onResize__ = listener;
        }
        return listener;
    };
    var group_setContentSize = eui.Group.prototype.setContentSize;
    eui.Group.prototype.setContentSize = function (width, height) {
        group_setContentSize.call(this, width, height);
        var self = this;
        if (self.__callback_onResize__) {
            self.__callback_onResize__.dispatch();
        }
    };
    eui.Group.prototype["__onHScrollChanged__"] = function () {
        var self = this;
        var v = self.scrollV;
        var max = self.contentHeight;
        var sv = max - self.height;
        if (sv > 0) {
            if (v < 5) {
                self.__callback_onHS__.dispatch(SBState.H_HEAD);
            }
            else if (v >= 5 && v <= sv - 5) {
                self.__callback_onHS__.dispatch(SBState.H_MID);
            }
            else if (v > sv - 5) {
                self.__callback_onHS__.dispatch(SBState.H_TAIL);
            }
        }
        else {
            self.__callback_onHS__.dispatch(SBState.INVALID);
        }
    };
    eui.Group.prototype["onHS"] = function () {
        var self = this;
        if (!self.__callback_onHS__) {
            self.__callback_onHS__ = new xgame.Signal1();
            self.__h_1_wacther__ = eui.Binding.bindHandler(self, ["contentWidth"], self.__onHScrollChanged__, this);
            self.__h_2_wacther__ = eui.Binding.bindHandler(self, ["scrollH"], self.__onHScrollChanged__, this);
        }
        return self.__callback_onHS__;
    };
    eui.Group.prototype["__onVScrollChanged__"] = function () {
        var self = this;
        var v = self.scrollV;
        var max = self.contentHeight;
        var sv = max - self.height;
        if (sv > 0) {
            if (v < 5) {
                self.__callback_onVS__.dispatch(SBState.V_HEAD);
            }
            else if (v >= 5 && v <= sv - 5) {
                self.__callback_onVS__.dispatch(SBState.V_MID);
            }
            else if (v > sv - 5) {
                self.__callback_onVS__.dispatch(SBState.V_TAIL);
            }
        }
        else {
            self.__callback_onVS__.dispatch(SBState.INVALID);
        }
    };
    eui.Group.prototype["onVS"] = function () {
        var self = this;
        if (!self.__callback_onVS__) {
            self.__callback_onVS__ = new xgame.Signal1();
            self.__v_1_wacther__ = eui.Binding.bindHandler(self, ["contentHeight"], self.__onVScrollChanged__, this);
            self.__v_2_wacther__ = eui.Binding.bindHandler(self, ["scrollV"], self.__onVScrollChanged__, this);
        }
        return self.__callback_onVS__;
    };
    var group_onRemoveFromStage = eui.Group.prototype["$onRemoveFromStage"];
    eui.Group.prototype["$onRemoveFromStage"] = function () {
        group_onRemoveFromStage.apply(this);
        var self = this;
        if (self.__callback_onResize__) {
            self.__callback_onResize__.removeAll();
        }
        if (self.__callback_onHS__) {
            self.__callback_onHS__.removeAll();
            self.__h_1_wacther__.unwatch();
            self.__h_2_wacther__.unwatch();
            self.__callback_onHS__ = undefined;
            self.__h_1_wacther__ = undefined;
            self.__h_2_wacther__ = undefined;
        }
        if (self.__callback_onVS__) {
            self.__callback_onVS__.removeAll();
            self.__v_1_wacther__.unwatch();
            self.__v_2_wacther__.unwatch();
            self.__callback_onVS__ = undefined;
            self.__v_1_wacther__ = undefined;
            self.__v_2_wacther__ = undefined;
        }
    };
    eui.DataGroup.prototype["getScroller"] = function () {
        var self = this;
        if (self.parent && egret.is(self.parent, "eui.Scroller")) {
            return self.parent;
        }
    };
    eui.DataGroup.prototype["setItemWidth"] = function (width) {
        var self = this;
        self.__itemWidth__ = width;
    };
    eui.DataGroup.prototype["setItemHeight"] = function (height) {
        var self = this;
        self.__itemHeight__ = height;
    };
    eui.DataGroup.prototype["scrollToIndex"] = function (index) {
        var self = this;
        var scroller = self.getScroller();
        if (!scroller) {
            return;
        }
        var size = 0;
        var gap = 0;
        var max_size = 0;
        if (egret.is(self.layout, "eui.LinearLayoutBase")) {
            gap = self.layout.gap;
        }
        if (self.__itemWidth__) {
            max_size = self.contentWidth - scroller.width;
            if (max_size < 0) {
                max_size = 0;
            }
            size = self.__itemWidth__;
            size += gap;
            size *= index;
            if (size > max_size) {
                size = max_size;
            }
            self.scrollH = size;
        }
        else if (self.__itemHeight__) {
            max_size = self.contentHeight - scroller.height;
            if (max_size < 0) {
                max_size = 0;
            }
            size = self.__itemHeight__;
            size += gap;
            size *= index;
            if (size > max_size) {
                size = max_size;
            }
            self.scrollV = size;
        }
    };
    eui.DataGroup.prototype["replaceAll"] = function (items, reset) {
        var self = this;
        var index = 0;
        if (typeof (reset) === "number") {
            index = reset;
            self.onResizeChanged().addOnce(function () {
                self.scrollToIndex(index);
            }, this);
        }
        var dataSource = self.__dataSource__;
        if (dataSource == undefined || typeof (reset) === "boolean" && reset) {
            dataSource = new eui.ArrayCollection(items);
            self.__dataSource__ = dataSource;
            self.dataProvider = dataSource;
        }
        else {
            dataSource.replaceAll(items);
        }
    };
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-08-18
*************************************************/

(function (egretx) {
    var EgretProvider = (function (_super) {
        __extends(EgretProvider, _super);
        function EgretProvider(main) {
            var _this = _super.call(this) || this;
            _this.main = main;
            _this.priority = 100;
            return _this;
        }
        EgretProvider.prototype.onInit = function (game) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, true];
                });
            });
        };
        EgretProvider.prototype.onStart = function (game) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    game.getService(egretx.IDragonBonesManagerInternal).initialize();
                    game.getService(egretx.IAnimationManagerInternal).initialize();
                    game.getService(egretx.IAudioManagerInternal).initialize();
                    game.getService(egretx.IResourceManagerInternal).initialize();
                    game.getService(egretx.IHttpManagerInternal).initialize();
                    game.getService(egretx.ISocketManagerInternal).initialize();
                    game.getService(egretx.IGuideManagerInternal).initialize();
                    return [2 /*return*/, true];
                });
            });
        };
        EgretProvider.prototype.onServiceRegister = function (game) {
            game.singleton(egretx.IDragonBonesManager, egretx.DragonBonesManager).withInstance(egretx.DragonBonesManager.Instance()).setAlias(egretx.IDragonBonesManagerInternal);
            console.log("[EgretProvider]: ???????????????{0}".format(xgame.getQualifiedClassName(egretx.DragonBonesManager)));
            game.singleton(egretx.IAnimationManager, egretx.AnimationManager).withInstance(egretx.AnimationManager.Instance()).setAlias(egretx.IAnimationManagerInternal);
            console.log("[EgretProvider]: ???????????????{0}".format(xgame.getQualifiedClassName(egretx.AnimationManager)));
            game.singleton(egretx.IAudioManager, egretx.AudioManager).withInstance(egretx.AudioManager.Instance()).setAlias(egretx.IAudioManagerInternal);
            console.log("[EgretProvider]: ???????????????{0}".format(xgame.getQualifiedClassName(egretx.AudioManager)));
            game.singleton(egretx.IResourceManager, egretx.ResourceManager).withInstance(egretx.ResourceManager.Instance()).setAlias(egretx.IResourceManagerInternal);
            console.log("[EgretProvider]: ???????????????{0}".format(xgame.getQualifiedClassName(egretx.ResourceManager)));
            game.singleton(egretx.IHttpManager, egretx.HttpManager).withInstance(egretx.HttpManager.Instance()).setAlias(egretx.IHttpManagerInternal);
            console.log("[EgretProvider]: ???????????????{0}".format(xgame.getQualifiedClassName(egretx.HttpManager)));
            game.singleton(egretx.ISocketManager, egretx.SocketManager).withInstance(egretx.SocketManager.Instance()).setAlias(egretx.ISocketManagerInternal);
            console.log("[EgretProvider]: ???????????????{0}".format(xgame.getQualifiedClassName(egretx.SocketManager)));
            game.singleton(egretx.IGuideManager, egretx.GuideManager).withInstance(egretx.GuideManager.Instance()).setAlias(egretx.IGuideManagerInternal);
            console.log("[EgretProvider]: ???????????????{0}".format(xgame.getQualifiedClassName(egretx.GuideManager)));
        };
        return EgretProvider;
    }(xgame.XObject));
    egretx.EgretProvider = EgretProvider;
    __reflect(EgretProvider.prototype, "egretx.EgretProvider", ["xgame.IServiceProvider"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    /**
     * ??????????????????
     */
    var AnimationManager = (function (_super) {
        __extends(AnimationManager, _super);
        function AnimationManager() {
            var _this = _super.call(this) || this;
            //????????????????????????????????????
            _this.playingClips = new xgame.Dictionary();
            _this.pools = new xgame.PoolGroup("AnimationClip");
            _this.factories = new xgame.Dictionary();
            return _this;
        }
        AnimationManager.prototype.initialize = function () {
        };
        /**
         * ?????????????????????????????????
         * @param key
         * @param movieClipName
         */
        AnimationManager.prototype.fetch = function (key, movieClipName) {
            movieClipName = movieClipName || key;
            var id = "{0}:{1}".format(key, movieClipName);
            var clip = this.pools.fetch(id, egretx.AnimationClip, function () { return new egretx.AnimationClip(key, movieClipName); }, this);
            this.playingClips.add(clip.hashCode, clip);
            return clip;
        };
        /**
         * ??????????????????
         * @param clip
         */
        AnimationManager.prototype.recycle = function (clip) {
            this.playingClips.remove(clip.hashCode);
            var id = "{0}:{1}".format(clip.key, clip.movieClipname);
            this.pools.recycle(id, egretx.AnimationClip, clip);
        };
        /**
         * ????????????????????????????????????
         * @param key
         */
        AnimationManager.prototype.release = function (key) {
            var _this = this;
            var pools = this.pools.pools;
            pools.forKeys(function (id) {
                var id_list = id.split(":");
                if (id_list[0] == key) {
                    _this._release(id);
                }
            }, this, true);
        };
        AnimationManager.prototype._release = function (id) {
            if (this.pools.getPool(id, egretx.AnimationClip).expired) {
                this.pools.release(id, egretx.AnimationClip);
                var key = id.split(":")[0];
                if (this.factories.containsKey(key)) {
                    this.factories.remove(key);
                    console.log("AnimationManager.clearMovieClipDataFactory({0})".format(key));
                }
                egretx.ResourceManager.Instance().getOrCreateGroup(egretx.ResourceType.MovieClip).release(key);
            }
        };
        /**
         * ????????????????????????????????????????????????
         */
        AnimationManager.prototype.releases = function () {
            var _this = this;
            var pools = this.pools.pools;
            pools.forKeys(function (id) {
                _this._release(id);
            }, this, true);
        };
        /**
         * ??????key?????????????????????????????????????????????????????????
         * @param key
         * @returns
         */
        AnimationManager.prototype.getRes = function (key) {
            var res = {};
            res.json = key + "_json";
            res.texture = key + "_png";
            return res;
        };
        /**
         * ?????????????????????
         * @param key
         * @param movieClipName
         * @returns
         */
        AnimationManager.prototype.generateMovieClipData = function (key, movieClipName) {
            movieClipName = movieClipName || key;
            var res = this.getRes(key);
            if (!RES.hasRes(res.json) || !RES.hasRes(res.texture)) {
                console.warn("??????{0}?????????????????????".format(key));
                return null;
            }
            var factory = this.factories.get(key);
            if (!factory) {
                factory = new egret.MovieClipDataFactory(RES.getRes(res.json), RES.getRes(res.texture));
                this.factories.add(key, factory);
            }
            movieClipName = movieClipName || key;
            return factory.generateMovieClipData(movieClipName);
        };
        return AnimationManager;
    }(xgame.Singleton));
    egretx.AnimationManager = AnimationManager;
    __reflect(AnimationManager.prototype, "egretx.AnimationManager", ["egretx.IAnimationManager", "xgame.IXObject", "egretx.IAnimationManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    /**
     * ???????????????
     */
    var AnimationClip = (function (_super) {
        __extends(AnimationClip, _super);
        function AnimationClip(key, movieClipname, actionName) {
            if (actionName === void 0) { actionName = "mc"; }
            var _this = _super.call(this) || this;
            _this.frameActions = [];
            _this.$timeline = xgame.Timeline.MAIN;
            _this.fromPoolHashCode = 0;
            _this.$timeScale = 1.0;
            _this.$scale = 1;
            _this.$mc_scaleX = 1;
            _this.$mc_scaleY = 1;
            _this.callback_preload = new xgame.Signal0();
            _this.$playTimes = 0;
            movieClipname = movieClipname || key;
            _this.name = "{0}:{1}".format(key, movieClipname);
            _this.key = key;
            _this.movieClipname = movieClipname;
            _this.actionName = actionName;
            _this.touchChildren = false;
            _this.touchEnabled = false;
            return _this;
        }
        Object.defineProperty(AnimationClip.prototype, "mc", {
            get: function () {
                return this.$mc;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationClip.prototype, "timeline", {
            get: function () {
                return this.$timeline;
            },
            enumerable: true,
            configurable: true
        });
        AnimationClip.prototype.setTimeline = function (value) {
            this.$timeline = value;
        };
        AnimationClip.prototype.release = function () {
            this.dispose();
            this.data = undefined;
            this.$mc = undefined;
            this.frameActions.length = 0;
        };
        AnimationClip.prototype.dispose = function () {
            this.removeSelf();
        };
        Object.defineProperty(AnimationClip.prototype, "frameRate", {
            get: function () {
                return this.$frameRate;
            },
            set: function (value) {
                this.$frameRate = value;
                if (this.mc) {
                    this.mc.frameRate = this.frameRate;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationClip.prototype, "timeScale", {
            get: function () {
                return this.$timeScale;
            },
            set: function (value) {
                this.$timeScale = value;
                if (this.$mc) {
                    this.$mc.timeScale = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationClip.prototype, "scale", {
            get: function () {
                return this.$scale;
            },
            set: function (value) {
                this.$scale = value;
                this.mc_scaleX = value;
                this.mc_scaleY = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationClip.prototype, "mc_scaleX", {
            get: function () {
                return this.$mc_scaleX;
            },
            set: function (value) {
                this.$mc_scaleX = value;
                if (this.$mc) {
                    this.$mc.scaleX = this.$mc_scaleX;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationClip.prototype, "mc_scaleY", {
            get: function () {
                return this.$mc_scaleY;
            },
            set: function (value) {
                this.$mc_scaleY = value;
                if (this.$mc) {
                    this.$mc.scaleY = this.$mc_scaleY;
                }
            },
            enumerable: true,
            configurable: true
        });
        AnimationClip.prototype.addFrameAction = function (action, thisObject, frame) {
            if (this.$mc) {
                if (isNaN(frame) || frame == 0) {
                    frame = this.data.numFrames;
                }
                this.$mc.addFrameAction(frame, action, thisObject);
            }
            else {
                this.frameActions.push(new egretx.FrameActionItem(action, thisObject, frame));
            }
        };
        AnimationClip.prototype.removeFrameActions = function (frame) {
            if (this.$mc) {
                if (isNaN(frame) || frame == 0) {
                    frame = this.data.numFrames;
                }
                this.$mc.removeFrameActions(frame);
            }
        };
        AnimationClip.prototype.preload = function () {
            var self = this;
            if (this.$mc) {
                this.callback_preload.dispatch();
            }
            else {
                this.loadMC(true).then(function () {
                    self.callback_preload.dispatch();
                });
            }
            return this.callback_preload;
        };
        AnimationClip.prototype.playWithAutoRemove = function (actionName) {
            var _this = this;
            this.addFrameAction(function () {
                egretx.AnimationManager.Instance().recycle(_this);
            }, this);
            this.play(1, actionName);
        };
        AnimationClip.prototype.play = function (playTimes, actionName) {
            if (actionName != undefined) {
                this.actionName = actionName;
            }
            if (isNaN(playTimes)) {
                this.$playTimes = 0;
            }
            else {
                this.$playTimes = playTimes;
            }
            if (this.mc) {
                this._play();
            }
            else {
                if (this.data) {
                    this.initMC(this.data);
                }
                else {
                    this.loadMC();
                }
            }
        };
        AnimationClip.prototype.loadMC = function (is_preload) {
            return __awaiter(this, void 0, void 0, function () {
                var resourceGroup, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            resourceGroup = egretx.ResourceManager.Instance().getOrCreateGroup(egretx.ResourceType.MovieClip);
                            resourceGroup.load(this.key);
                            res = egretx.AnimationManager.Instance().getRes(this.key);
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.json)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.texture)];
                        case 2:
                            _a.sent();
                            this.data = egretx.AnimationManager.Instance().generateMovieClipData(this.key, this.movieClipname);
                            this.initMC(this.data, is_preload);
                            return [2 /*return*/];
                    }
                });
            });
        };
        AnimationClip.prototype.onFrameLabelEvent = function (event) {
            this.dispatchEvent(event);
        };
        AnimationClip.prototype.onLoopCompleteEvent = function (event) {
            this.dispatchEvent(event);
        };
        AnimationClip.prototype.onCompleteEvent = function (event) {
            this.dispatchEvent(event);
        };
        AnimationClip.prototype.initMC = function (mcData, is_preload) {
            var res = egretx.AnimationManager.Instance().getRes(this.key);
            if (!RES.getRes(res.json)) {
                return;
            }
            ;
            for (var _i = 0, _a = this.frameActions; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.frame == -1) {
                    item.frame = mcData.numFrames;
                }
            }
            this.$mc = new egretx.MovieClip(mcData, this.frameActions);
            this.mc.timeScale = this.timeScale;
            this.mc.setTimeline(this.timeline);
            this.mc.scaleX = this.mc_scaleX;
            this.mc.scaleY = this.mc_scaleY;
            if (egretx.MovieClip.DISPATCH_ENABLE) {
                this.mc.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onFrameLabelEvent, this);
                this.mc.addEventListener(egret.MovieClipEvent.LOOP_COMPLETE, this.onLoopCompleteEvent, this);
                this.mc.addEventListener(egret.MovieClipEvent.COMPLETE, this.onCompleteEvent, this);
            }
            if (!isNaN(this.frameRate) && this.frameRate > 0) {
                this.mc.frameRate = this.frameRate;
            }
            this.frameActions.length = 0;
            this.addChild(this.$mc);
            if (!is_preload) {
                this._play();
            }
        };
        AnimationClip.prototype._play = function () {
            if (this.mc) {
                if (this.actionName) {
                    this.mc.gotoAndPlay(this.actionName, this.$playTimes);
                }
                else {
                    this.mc.play(this.$playTimes);
                }
            }
        };
        AnimationClip.prototype.stop = function () {
            if (this.mc) {
                this.mc.stop();
            }
        };
        AnimationClip.prototype.reset = function () {
            if (this.mc) {
                this.mc.removeFrameActions();
            }
        };
        AnimationClip.prototype.removeSelf = function () {
            this.stop();
            if (this.mc) {
                this.mc.removeEventListener(egret.MovieClipEvent.FRAME_LABEL, this.onFrameLabelEvent, this);
                this.mc.removeEventListener(egret.MovieClipEvent.LOOP_COMPLETE, this.onLoopCompleteEvent, this);
                this.mc.removeEventListener(egret.MovieClipEvent.COMPLETE, this.onCompleteEvent, this);
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return AnimationClip;
    }(eui.Component));
    egretx.AnimationClip = AnimationClip;
    __reflect(AnimationClip.prototype, "egretx.AnimationClip", ["xgame.IPoolable", "xgame.IDisposable", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    var FrameAction = (function () {
        function FrameAction(frame) {
            this.name = "FrameAction";
            this.frame = frame;
        }
        Object.defineProperty(FrameAction.prototype, "frame", {
            get: function () {
                return this.$frame;
            },
            set: function (value) {
                if (isNaN(value)) {
                    this.$frame = -1;
                }
                else {
                    this.$frame = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        FrameAction.prototype.hasAction = function (action, thisObject) {
            if (this.$items == null) {
                return -1;
            }
            for (var i = 0; i < this.$items.length; i++) {
                var item = this.$items[i];
                if (item.action == action && item.thisObject == thisObject) {
                    return i;
                }
            }
            return -1;
        };
        FrameAction.prototype.addAction = function (action, thisObject) {
            if (this.$items == null) {
                this.$items = [];
            }
            if (this.hasAction(action, thisObject) == -1) {
                this.$items[this.$items.length] = new egretx.FrameActionItem(action, thisObject, this.frame);
            }
        };
        FrameAction.prototype.removeAction = function (action, thisObject) {
            if (this.$items) {
                var index = this.hasAction(action, thisObject);
                if (index >= 0) {
                    this.$items.splice(index, 1);
                }
            }
        };
        FrameAction.prototype.removeActions = function () {
            if (this.$items) {
                this.$items.length = 0;
            }
        };
        FrameAction.prototype.executeActions = function (target, frameID) {
            if (this.$items) {
                var list = this.$items.slice();
                for (var i = 0, len = list.length; i < len; ++i) {
                    var item = list[i];
                    var action = item.action;
                    var numArgs = action.length;
                    if (numArgs == 0) {
                        action.call(item.thisObject);
                    }
                    else if (numArgs == 1) {
                        action.call(item.thisObject, target);
                    }
                    else if (numArgs == 2) {
                        action.call(item.thisObject, target, frameID);
                    }
                }
            }
        };
        Object.defineProperty(FrameAction.prototype, "numActions", {
            get: function () {
                return this.$items ? this.$items.length : 0;
            },
            enumerable: true,
            configurable: true
        });
        return FrameAction;
    }());
    egretx.FrameAction = FrameAction;
    __reflect(FrameAction.prototype, "egretx.FrameAction");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    var FrameActionItem = (function () {
        function FrameActionItem(action, thisObject, frame) {
            this.action = action;
            this.thisObject = thisObject;
            if (isNaN(frame) || frame == 0) {
                this.frame = -1;
            }
            else {
                this.frame = frame;
            }
        }
        return FrameActionItem;
    }());
    egretx.FrameActionItem = FrameActionItem;
    __reflect(FrameActionItem.prototype, "egretx.FrameActionItem");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    /**
     * ???egret.MoveClip????????????
     */
    var MovieClip = (function (_super) {
        __extends(MovieClip, _super);
        //Construct Function
        /**
         * ???????????? MovieClip ??????????????? MovieClip ????????????????????????????????????????????????addElement?????????
         * @param movieClipData {movieClipData} ???????????? movieClipData ??????
         * @version Egret 2.4
         * @platform Web,Native
         */
        function MovieClip(movieClipData, invokeActions) {
            var _this = _super.call(this) || this;
            _this.$actions = new xgame.Dictionary();
            _this.$timeline = xgame.Timeline.MAIN;
            //Render Property
            _this.$texture = null;
            //Render Property
            // private offsetPoint: egret.Point = egret.Point.create(0, 0);
            _this.offsetPoint = new egret.Point(0, 0);
            //Data Property
            _this.$movieClipData = null;
            /**
             * @private
             */
            _this.frames = null;
            /**
             * @private
             */
            _this.$totalFrames = 0;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            _this.frameLabels = null;
            /**
             * @private
             */
            _this.$frameLabelStart = 0;
            /**
             * @private
             */
            _this.$frameLabelEnd = 0;
            /**
             * @version Egret 2.4
             * @platform Web,Native
             * @private
             */
            _this.frameEvents = null;
            /**
             * @private
             */
            _this.frameIntervalTime = 0;
            /**
             * @private
             */
            _this.$eventPool = null;
            //Animation Property
            _this.$isPlaying = false;
            /**
             * @private
             */
            _this.isStopped = true;
            /**
             * @private
             */
            _this.playTimes = 0;
            /**
             * @private
             */
            _this.$currentFrameNum = 0;
            /**
             * @private
             */
            _this.$nextFrameNum = 1;
            /**
             * @private
             */
            _this.displayedKeyFrameNum = 0;
            /**
             * @private
             */
            _this.passedTime = 0;
            /**
             * @private
             */
            _this.$frameRate = NaN;
            _this.$timeScale = 1.0;
            /**
             * @private
             */
            _this.lastTime = 0;
            _this.invokeActions = invokeActions;
            _this.$smoothing = egret.Bitmap.defaultSmoothing;
            _this.setMovieClipData(movieClipData);
            if (!egret.nativeRender) {
                _this.$renderNode = new egret.sys.NormalBitmapNode();
            }
            return _this;
        }
        Object.defineProperty(MovieClip.prototype, "timeline", {
            get: function () {
                return this.$timeline;
            },
            enumerable: true,
            configurable: true
        });
        MovieClip.prototype.setTimeline = function (value) {
            this.$timeline = value;
        };
        MovieClip.prototype.setData = function (movieClipData, invokeActions) {
            this.setInvokeActions(invokeActions);
            this.setMovieClipData(movieClipData, true);
        };
        MovieClip.prototype.setInvokeActions = function (invokeActions) {
            this.invokeActions = invokeActions;
        };
        Object.defineProperty(MovieClip.prototype, "timeScale", {
            get: function () {
                return this.$timeScale;
            },
            set: function (value) {
                this.$timeScale = value;
            },
            enumerable: true,
            configurable: true
        });
        MovieClip.prototype.createNativeDisplayObject = function () {
            this.$nativeDisplayObject = new egret_native.NativeDisplayObject(11 /* BITMAP_TEXT */);
        };
        Object.defineProperty(MovieClip.prototype, "smoothing", {
            /**
             * Whether or not is smoothed when scaled.
             * @version Egret 3.0
             * @platform Web
             * @language en_US
             */
            /**
             * ?????????????????????????????????????????????
             * @version Egret 3.0
             * @platform Web
             * @language zh_CN
             */
            get: function () {
                return this.$smoothing;
            },
            set: function (value) {
                if (value == this.$smoothing) {
                    return;
                }
                this.$smoothing = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         */
        MovieClip.prototype.$init = function () {
            this.$reset();
            var movieClipData = this.$movieClipData;
            if (movieClipData && movieClipData.$isDataValid()) {
                this.frames = movieClipData.frames;
                this.$totalFrames = movieClipData.numFrames;
                this.frameLabels = movieClipData.labels;
                this.frameEvents = movieClipData.events;
                this.$frameRate = movieClipData.frameRate;
                this.frameIntervalTime = 1000 / this.$frameRate;
                this.fillMovieFrames();
                this._initFrame();
            }
        };
        MovieClip.prototype.fillMovieFrames = function () {
            var len = this.movieClipData.frames.length;
            this.$actions.add(len, new egretx.FrameAction(len));
            if (this.invokeActions && this.invokeActions.length > 0) {
                for (var _i = 0, _a = this.invokeActions; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.frame == -1) {
                        item.frame = this.movieClipData.numFrames;
                    }
                    var action = this.getActionAt(item.frame);
                    if (action) {
                        action.addAction(item.action, item.thisObject);
                    }
                    else {
                        //this.logger.logDebug(LogChannel.RONTIAN,"frame not found=>" + item.frame + "=>" + this.frames.length + "=>" + this.movieClipData.numFrames);
                    }
                }
            }
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.$reset = function () {
            this.frames = null;
            this.playTimes = 0;
            this.$isPlaying = false;
            this.setIsStopped(true);
            this.$currentFrameNum = 0;
            this.$nextFrameNum = 1;
            this.displayedKeyFrameNum = 0;
            this.passedTime = 0;
            this.$eventPool = [];
            this.$actions.clear();
        };
        /**
         * @private
         *
         */
        MovieClip.prototype._initFrame = function () {
            if (this.$movieClipData.$isTextureValid()) {
                this.advanceFrame();
                this.constructFrame();
            }
        };
        /**
         * @private
         */
        MovieClip.prototype.$updateRenderNode = function () {
            var texture = this.$texture;
            if (texture) {
                var offsetX = Math.round(this.offsetPoint.x);
                var offsetY = Math.round(this.offsetPoint.y);
                var bitmapWidth = texture.$bitmapWidth;
                var bitmapHeight = texture.$bitmapHeight;
                var textureWidth = texture.$getTextureWidth();
                var textureHeight = texture.$getTextureHeight();
                //this.logger.logDebug(LogChannel.RONTIAN, textureWidth, textureHeight, this.width, this.height);
                var destW = Math.round(texture.$getScaleBitmapWidth());
                var destH = Math.round(texture.$getScaleBitmapHeight());
                var sourceWidth = texture.$sourceWidth;
                var sourceHeight = texture.$sourceHeight;
                egret.sys.BitmapNode.$updateTextureData(this.$renderNode, texture.$bitmapData, texture.$bitmapX, texture.$bitmapY, bitmapWidth, bitmapHeight, offsetX, offsetY, textureWidth, textureHeight, destW, destH, sourceWidth, sourceHeight, egret.BitmapFillMode.SCALE, this.$smoothing);
            }
        };
        /**
         * @private
         */
        MovieClip.prototype.$measureContentBounds = function (bounds) {
            var texture = this.$texture;
            if (texture) {
                var x = this.offsetPoint.x;
                var y = this.offsetPoint.y;
                var w = texture.$getTextureWidth();
                var h = texture.$getTextureHeight();
                bounds.setTo(x, y, w, h);
            }
            else {
                bounds.setEmpty();
            }
        };
        /**
         * @private
         *
         * @param stage
         * @param nestLevel
         */
        MovieClip.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            if (this.$isPlaying && this.$totalFrames > 1) {
                this.setIsStopped(false);
            }
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.$onRemoveFromStage = function () {
            this.setIsStopped(true);
            _super.prototype.$onRemoveFromStage.call(this);
        };
        //Data Function
        /**
         * @private
         * ????????????????????????????????????FrameLabel??????
         * @param labelName {string} ????????????
         * @param ignoreCase {boolean} ?????????????????????????????????????????????false
         * @returns {egret.FrameLabel} FrameLabel??????
         */
        MovieClip.prototype.getFrameLabelByName = function (labelName, ignoreCase) {
            if (ignoreCase === void 0) { ignoreCase = false; }
            if (ignoreCase) {
                labelName = labelName.toLowerCase();
            }
            var frameLabels = this.frameLabels;
            if (frameLabels) {
                var outputFramelabel = null;
                for (var i = 0; i < frameLabels.length; i++) {
                    outputFramelabel = frameLabels[i];
                    if (ignoreCase ? outputFramelabel.name.toLowerCase() == labelName : outputFramelabel.name == labelName) {
                        return outputFramelabel;
                    }
                }
            }
            return null;
        };
        /**
         * @private
         * ????????????????????????????????????????????????
         * @param labelName {string} ????????????
         */
        MovieClip.prototype.getFrameStartEnd = function (labelName) {
            var frameLabels = this.frameLabels;
            if (frameLabels) {
                var outputFramelabel = null;
                for (var i = 0; i < frameLabels.length; i++) {
                    outputFramelabel = frameLabels[i];
                    if (labelName == outputFramelabel.name) {
                        this.$frameLabelStart = outputFramelabel.frame;
                        this.$frameLabelEnd = outputFramelabel.end;
                        break;
                    }
                }
            }
        };
        /**
         * @private
         * ???????????????????????????FrameLabel??????
         * @param frame {number} ?????????
         * @returns {egret.FrameLabel} FrameLabel??????
         */
        MovieClip.prototype.getFrameLabelByFrame = function (frame) {
            var frameLabels = this.frameLabels;
            if (frameLabels) {
                var outputFramelabel = null;
                for (var i = 0; i < frameLabels.length; i++) {
                    outputFramelabel = frameLabels[i];
                    if (outputFramelabel.frame == frame) {
                        return outputFramelabel;
                    }
                }
            }
            return null;
        };
        /**
         * @private
         * ?????????????????????????????????FrameLabel?????????????????????????????????????????????????????????????????????????????????FrameLabel??????
         * @method egret.MovieClip#getFrameLabelForFrame
         * @param frame {number} ?????????
         * @returns {egret.FrameLabel} FrameLabel??????
         */
        MovieClip.prototype.getFrameLabelForFrame = function (frame) {
            var outputFrameLabel = null;
            var tempFrameLabel = null;
            var frameLabels = this.frameLabels;
            if (frameLabels) {
                for (var i = 0; i < frameLabels.length; i++) {
                    tempFrameLabel = frameLabels[i];
                    if (tempFrameLabel.frame > frame) {
                        return outputFrameLabel;
                    }
                    outputFrameLabel = tempFrameLabel;
                }
            }
            return outputFrameLabel;
        };
        //Animation Function
        /**
         * ????????????????????????
         * @param playTimes {number} ??????????????? ?????????????????????????????????>=1????????????????????????<0??????????????????????????? 0????????????????????????(MovieClip???????????????????????????1)???
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.play = function (playTimes) {
            if (playTimes === void 0) { playTimes = 0; }
            this.lastTime = egret.getTimer();
            this.passedTime = 0;
            this.$isPlaying = true;
            this.setPlayTimes(playTimes);
            if (this.$totalFrames > 1 && this.$stage) {
                this.setIsStopped(false);
            }
        };
        /**
         * ??????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.stop = function () {
            this.$isPlaying = false;
            this.setIsStopped(true);
        };
        /**
         * ????????????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.prevFrame = function () {
            this.gotoAndStop(this.$currentFrameNum - 1);
        };
        /**
         * ????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.nextFrame = function () {
            this.gotoAndStop(this.$currentFrameNum + 1);
        };
        /**
         * ????????????????????????????????????
         * @param frame {any} ??????????????????????????????
         * @param playTimes {number} ??????????????? ?????????????????????????????????>=1????????????????????????<0??????????????????????????? 0???????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.gotoAndPlay = function (frame, playTimes) {
            if (playTimes === void 0) { playTimes = 0; }
            if (arguments.length == 0 || arguments.length > 2) {
                egret.$error(1022, "MovieClip.gotoAndPlay()");
            }
            if (typeof frame === "string") {
                this.getFrameStartEnd(frame);
            }
            else {
                this.$frameLabelStart = 0;
                this.$frameLabelEnd = 0;
            }
            this.play(playTimes);
            this.gotoFrame(frame);
        };
        /**
         * ????????????????????????????????????
         * @param frame {any} ??????????????????????????????
         * @version Egret 2.4
         * @platform Web,Native
         */
        MovieClip.prototype.gotoAndStop = function (frame) {
            if (arguments.length != 1) {
                egret.$error(1022, "MovieClip.gotoAndStop()");
            }
            this.stop();
            this.gotoFrame(frame);
        };
        /**
         * @private
         *
         * @param frame
         */
        MovieClip.prototype.gotoFrame = function (frame) {
            var frameNum;
            if (typeof frame === "string") {
                var fb = this.getFrameLabelByName(frame);
                if (!fb) {
                    return;
                }
                frameNum = fb.frame;
            }
            else {
                frameNum = parseInt(frame + '', 10);
                if (frameNum != frame) {
                    egret.$error(1022, "Frame Label Not Found");
                }
            }
            //this.logger.logDebug(LogChannel.RONTIAN,"gotoFrame=>{0}", frameNum);
            if (frameNum < 1) {
                frameNum = 1;
            }
            else if (frameNum > this.$totalFrames) {
                frameNum = this.$totalFrames;
            }
            // if (frameNum == this.$nextFrameNum) {
            //     return;
            // }
            this.$nextFrameNum = frameNum;
            this.advanceFrame();
            this.constructFrame();
            this.handlePendingEvent();
        };
        MovieClip.prototype.advanceTime = function (time) {
            var self = this;
            var deltaTime = time * this.timeScale;
            var frameIntervalTime = self.frameIntervalTime;
            var currentTime = self.passedTime + deltaTime;
            self.passedTime = currentTime % frameIntervalTime;
            var num = currentTime / frameIntervalTime;
            if (num < 1) {
                return;
            }
            while (num >= 1) {
                num--;
                self.$nextFrameNum++;
                if (self.$nextFrameNum > self.$totalFrames || (self.$frameLabelStart > 0 && self.$nextFrameNum > self.$frameLabelEnd)) {
                    if (self.playTimes == -1) {
                        self.$eventPool.push(egret.Event.LOOP_COMPLETE);
                        self.$nextFrameNum = 1;
                    }
                    else {
                        self.playTimes--;
                        if (self.playTimes > 0) {
                            self.$eventPool.push(egret.Event.LOOP_COMPLETE);
                            self.$nextFrameNum = 1;
                        }
                        else {
                            self.$nextFrameNum = self.$totalFrames;
                            self.$eventPool.push(egret.Event.COMPLETE);
                            self.stop();
                            break;
                        }
                    }
                }
                if (self.$currentFrameNum == self.$frameLabelEnd) {
                    self.$nextFrameNum = self.$frameLabelStart;
                }
                self.advanceFrame();
            }
            self.constructFrame();
            self.handlePendingEvent();
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.advanceFrame = function () {
            this.$currentFrameNum = this.$nextFrameNum;
            var event = this.frameEvents[this.$nextFrameNum];
            if (event && event != "") {
                if (MovieClip.DISPATCH_ENABLE) {
                    egret.MovieClipEvent.dispatchMovieClipEvent(this, egret.MovieClipEvent.FRAME_LABEL, event);
                }
            }
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.constructFrame = function () {
            var self = this;
            var currentFrameNum = self.$currentFrameNum;
            if (self.displayedKeyFrameNum == currentFrameNum) {
                return;
            }
            var texture = self.$movieClipData.getTextureByFrame(currentFrameNum);
            self.$texture = texture;
            self.$movieClipData.$getOffsetByFrame(currentFrameNum, self.offsetPoint);
            self.displayedKeyFrameNum = currentFrameNum;
            self.$renderDirty = true;
            if (egret.nativeRender) {
                self.$nativeDisplayObject.setDataToBitmapNode(self.$nativeDisplayObject.id, texture, [texture.$bitmapX, texture.$bitmapY, texture.$bitmapWidth, texture.$bitmapHeight,
                    self.offsetPoint.x, self.offsetPoint.y, texture.$getScaleBitmapWidth(), texture.$getScaleBitmapHeight(),
                    texture.$sourceWidth, texture.$sourceHeight]);
                //todo ??????offsetPoint
                self.$nativeDisplayObject.setWidth(texture.$getTextureWidth() + self.offsetPoint.x);
                self.$nativeDisplayObject.setHeight(texture.$getTextureHeight() + self.offsetPoint.y);
            }
            else {
                var p = self.$parent;
                if (p && !p.$cacheDirty) {
                    p.$cacheDirty = true;
                    p.$cacheDirtyUp();
                }
                var maskedObject = self.$maskedObject;
                if (maskedObject && !maskedObject.$cacheDirty) {
                    maskedObject.$cacheDirty = true;
                    maskedObject.$cacheDirtyUp();
                }
            }
            if (this.$actions.containsKey(this.currentFrame)) {
                var action = this.$actions.get(this.currentFrame);
                if (action && action.numActions > 0) {
                    action.executeActions(this, currentFrameNum);
                }
            }
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.$renderFrame = function () {
            var self = this;
            self.$texture = self.$movieClipData.getTextureByFrame(self.$currentFrameNum);
            self.$renderDirty = true;
            var p = self.$parent;
            if (p && !p.$cacheDirty) {
                p.$cacheDirty = true;
                p.$cacheDirtyUp();
            }
            var maskedObject = self.$maskedObject;
            if (maskedObject && !maskedObject.$cacheDirty) {
                maskedObject.$cacheDirty = true;
                maskedObject.$cacheDirtyUp();
            }
        };
        /**
         * @private
         *
         */
        MovieClip.prototype.handlePendingEvent = function () {
            if (this.$eventPool.length != 0) {
                this.$eventPool.reverse();
                var eventPool = this.$eventPool;
                var length_1 = eventPool.length;
                var isComplete = false;
                var isLoopComplete = false;
                for (var i = 0; i < length_1; i++) {
                    var event_1 = eventPool.pop();
                    if (event_1 == egret.Event.LOOP_COMPLETE) {
                        isLoopComplete = true;
                    }
                    else if (event_1 == egret.Event.COMPLETE) {
                        isComplete = true;
                    }
                    else {
                        if (MovieClip.DISPATCH_ENABLE) {
                            this.dispatchEventWith(event_1);
                        }
                    }
                }
                if (isLoopComplete) {
                    if (MovieClip.DISPATCH_ENABLE) {
                        this.dispatchEventWith(egret.Event.LOOP_COMPLETE);
                    }
                }
                if (isComplete) {
                    if (MovieClip.DISPATCH_ENABLE) {
                        this.dispatchEventWith(egret.Event.COMPLETE);
                    }
                }
            }
        };
        Object.defineProperty(MovieClip.prototype, "totalFrames", {
            //Properties
            /**
             * MovieClip ?????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$totalFrames;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "currentFrame", {
            /**
             * MovieClip ?????????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$currentFrameNum;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "currentFrameLabel", {
            /**
             * MovieClip ????????????????????????????????????????????????????????????????????? currentFrameLabel??????null???
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                var label = this.getFrameLabelByFrame(this.$currentFrameNum);
                return label && label.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "currentLabel", {
            /**
             * ?????????????????????????????????????????????????????????????????????currentLabel??????????????????????????????????????????????????????????????????????????????????????????currentLabel??????null???
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                var label = this.getFrameLabelForFrame(this.$currentFrameNum);
                return label ? label.name : null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "frameRate", {
            /**
             * MovieClip ???????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$frameRate;
            },
            set: function (value) {
                if (value == this.$frameRate) {
                    return;
                }
                this.$frameRate = value;
                this.frameIntervalTime = 1000 / this.$frameRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "isPlaying", {
            /**
             * MovieClip ??????????????????????????????
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$isPlaying;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MovieClip.prototype, "movieClipData", {
            /**
             * @version Egret 2.4
             * @platform Web,Native
             */
            get: function () {
                return this.$movieClipData;
            },
            /**
             * MovieClip?????????
             */
            set: function (value) {
                this.setMovieClipData(value);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @private
         *
         * @param value
         */
        MovieClip.prototype.setMovieClipData = function (value, force) {
            if (this.$movieClipData == value && !force) {
                return;
            }
            this.$movieClipData = value;
            this.$init();
        };
        /**
         * @private
         *
         * @param value
         */
        MovieClip.prototype.setPlayTimes = function (value) {
            if (value < 0 || value >= 1) {
                this.playTimes = value < 0 ? -1 : Math.floor(value);
            }
        };
        /**
         * @private
         *
         * @param value
         */
        MovieClip.prototype.setIsStopped = function (value) {
            if (this.isStopped == value) {
                return;
            }
            this.isStopped = value;
            if (value) {
                xgame.TimelineManager.Instance().getOrCreateTimeline(this.timeline).remove(this);
            }
            else {
                this.playTimes = this.playTimes == 0 ? 1 : this.playTimes;
                this.lastTime = egret.getTimer();
                xgame.TimelineManager.Instance().getOrCreateTimeline(this.timeline).add(this);
            }
        };
        MovieClip.prototype.getActionAt = function (frame) {
            if (frame < 1 || frame > this.totalFrames) {
                return null;
            }
            if (!this.$actions.containsKey(frame)) {
                this.$actions.add(frame, new egretx.FrameAction(frame));
            }
            return this.$actions.get(frame);
        };
        MovieClip.prototype.addFrameAction = function (frame, action, thisObject) {
            this.getActionAt(frame).addAction(action, thisObject);
        };
        MovieClip.prototype.removeFrameAction = function (frame, action, thisObject) {
            this.getActionAt(frame).removeAction(action, thisObject);
        };
        MovieClip.prototype.removeFrameActions = function (frame) {
            if (isNaN(frame)) {
                this.$actions.forValues(function (v) {
                    v.removeActions();
                }, this);
            }
            else {
                this.getActionAt(frame).removeActions();
            }
        };
        MovieClip.DISPATCH_ENABLE = false;
        return MovieClip;
    }(egret.DisplayObject));
    egretx.MovieClip = MovieClip;
    __reflect(MovieClip.prototype, "egretx.MovieClip", ["xgame.IAnimatable", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    egretx.IAnimationManager = Symbol.for("IAnimationManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    egretx.IAnimationManagerInternal = Symbol.for("IAnimationManagerInternal");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    /**
     * ???????????????
     */
    var AudioManager = (function (_super) {
        __extends(AudioManager, _super);
        function AudioManager() {
            return _super.call(this) || this;
        }
        AudioManager.prototype.initialize = function () {
            this.background = new egretx.MusicAudioChannel();
            this.ui = new egretx.MusicAudioChannel();
            this.effect = new egretx.EffectAudioChannel();
        };
        return AudioManager;
    }(xgame.Singleton));
    egretx.AudioManager = AudioManager;
    __reflect(AudioManager.prototype, "egretx.AudioManager", ["egretx.IAudioManager", "xgame.IXObject", "egretx.IAudioManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    var AudioToggleState;
    (function (AudioToggleState) {
        AudioToggleState[AudioToggleState["OFF"] = 0] = "OFF";
        AudioToggleState[AudioToggleState["ON"] = 1] = "ON";
    })(AudioToggleState = egretx.AudioToggleState || (egretx.AudioToggleState = {}));
    /**
     * ????????????
     */
    var AudioChannel = (function (_super) {
        __extends(AudioChannel, _super);
        function AudioChannel(channelType) {
            var _this = _super.call(this) || this;
            _this.channelType = channelType;
            _this.callback_onPlayCompleted = new xgame.Signal1();
            _this.$toggleState = AudioToggleState.ON;
            _this.$volume = 0.5;
            _this.playTimes = 1;
            return _this;
        }
        AudioChannel.prototype.onPlayCompleted = function () {
            return this.callback_onPlayCompleted;
        };
        Object.defineProperty(AudioChannel.prototype, "toggleState", {
            get: function () {
                return this.$toggleState;
            },
            enumerable: true,
            configurable: true
        });
        AudioChannel.prototype.toggleOn = function () {
            if (this.toggleState == AudioToggleState.ON) {
                return;
            }
            this.$toggleState = AudioToggleState.ON;
            this.resume();
        };
        AudioChannel.prototype.toggleOff = function () {
            if (this.toggleState == AudioToggleState.OFF) {
                return;
            }
            this.$toggleState = AudioToggleState.OFF;
            this.stop();
        };
        Object.defineProperty(AudioChannel.prototype, "volume", {
            get: function () {
                return this.$volume;
            },
            enumerable: true,
            configurable: true
        });
        AudioChannel.prototype.setVolume = function (volume) {
            this.$volume = volume;
        };
        AudioChannel.prototype.play = function (key, playTimes) {
            if (playTimes === void 0) { playTimes = 1; }
        };
        AudioChannel.prototype.pause = function () {
        };
        AudioChannel.prototype.resume = function () {
        };
        AudioChannel.prototype.stop = function () {
        };
        return AudioChannel;
    }(xgame.XObject));
    egretx.AudioChannel = AudioChannel;
    __reflect(AudioChannel.prototype, "egretx.AudioChannel");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
/// <reference path="./core/AudioChannel.ts" />

(function (egretx) {
    var EffectAudioChannel = (function (_super) {
        __extends(EffectAudioChannel, _super);
        function EffectAudioChannel() {
            var _this = _super.call(this, egretx.AudioChannelType.EFFECT) || this;
            _this.freeAudioes = [];
            _this.playAudioes = [];
            for (var i = 0; i < EffectAudioChannel.instanceMax; i++) {
                if (egretx.AudioManager.Instance().createAudioInstance) {
                    _this.freeAudioes.push(egretx.AudioManager.Instance().createAudioInstance("effect"));
                }
                else {
                    _this.freeAudioes.push(new egretx.WebAudio("effect"));
                }
            }
            return _this;
        }
        EffectAudioChannel.prototype.play = function (key, playTimes) {
            var _this = this;
            if (!this.freeAudioes.length) {
                console.log("????????????????????????????????????????????????:" + key);
                return;
            }
            var audio = this.freeAudioes.shift();
            this.playAudioes.push(audio);
            audio.play(key, 0, playTimes).then(function () {
                _this.releaseAudio(audio);
            });
        };
        EffectAudioChannel.prototype.pause = function () {
            for (var i = this.playAudioes.length - 1; i >= 0; i--) {
                var audio = this.playAudioes[i];
                audio.pause();
            }
        };
        EffectAudioChannel.prototype.resume = function () {
            for (var i = this.playAudioes.length - 1; i >= 0; i--) {
                var audio = this.playAudioes[i];
                audio.resume();
            }
        };
        EffectAudioChannel.prototype.stop = function () {
            while (this.playAudioes.length) {
                var audio = this.playAudioes.pop();
                audio.stop();
                this.freeAudioes.unshift(audio);
            }
        };
        EffectAudioChannel.prototype.releaseAudio = function (audio) {
            var indexOf = this.playAudioes.indexOf(audio);
            if (indexOf >= 0) {
                this.playAudioes.splice(indexOf, 1);
            }
            if (this.freeAudioes.indexOf(audio) == -1) {
                this.freeAudioes.unshift(audio);
            }
        };
        EffectAudioChannel.instanceMax = 3;
        return EffectAudioChannel;
    }(egretx.AudioChannel));
    egretx.EffectAudioChannel = EffectAudioChannel;
    __reflect(EffectAudioChannel.prototype, "egretx.EffectAudioChannel");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/
/// <reference path="./core/AudioChannel.ts" />

(function (egretx) {
    var MusicAudioChannel = (function (_super) {
        __extends(MusicAudioChannel, _super);
        function MusicAudioChannel() {
            var _this = _super.call(this, egretx.AudioChannelType.BACKGORUND) || this;
            if (egretx.AudioManager.Instance().createAudioInstance) {
                _this.main = egretx.AudioManager.Instance().createAudioInstance("music");
            }
            else {
                _this.main = new egretx.WebAudio("music");
            }
            return _this;
        }
        MusicAudioChannel.prototype.play = function (key, playTimes) {
            this.key = key;
            this.playTimes = playTimes;
            this.main.play(key, 0, playTimes);
        };
        MusicAudioChannel.prototype.pause = function () {
            this.main.pause();
        };
        MusicAudioChannel.prototype.resume = function () {
            this.main.resume();
        };
        MusicAudioChannel.prototype.stop = function () {
            this.main.stop();
        };
        return MusicAudioChannel;
    }(egretx.AudioChannel));
    egretx.MusicAudioChannel = MusicAudioChannel;
    __reflect(MusicAudioChannel.prototype, "egretx.MusicAudioChannel");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    var Audio = (function (_super) {
        __extends(Audio, _super);
        function Audio(type) {
            if (type === void 0) { type = "EFFECT"; }
            var _this = _super.call(this) || this;
            _this.type = type;
            _this.$volume = 0.5;
            return _this;
        }
        Object.defineProperty(Audio.prototype, "info", {
            get: function () {
                return this.key && RES.getResourceInfo(this.key);
            },
            enumerable: true,
            configurable: true
        });
        Audio.prototype.load = function () {
            return null;
        };
        Audio.prototype.play = function (key, startTime, playTimes) {
            if (startTime === void 0) { startTime = 0; }
            if (playTimes === void 0) { playTimes = 0; }
            return null;
        };
        Audio.prototype.pause = function () {
        };
        Audio.prototype.resume = function () {
        };
        Audio.prototype.stop = function () {
        };
        Object.defineProperty(Audio.prototype, "volume", {
            get: function () {
                return this.$volume;
            },
            enumerable: true,
            configurable: true
        });
        Audio.prototype.setVolume = function (volume) {
            this.$volume = volume;
        };
        Audio.prototype.destroy = function () {
        };
        return Audio;
    }(xgame.XObject));
    egretx.Audio = Audio;
    __reflect(Audio.prototype, "egretx.Audio");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    var AudioChannelType;
    (function (AudioChannelType) {
        AudioChannelType[AudioChannelType["BACKGORUND"] = 0] = "BACKGORUND";
        AudioChannelType[AudioChannelType["EFFECT"] = 1] = "EFFECT";
    })(AudioChannelType = egretx.AudioChannelType || (egretx.AudioChannelType = {}));
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    /**
     * ????????????????????????
     */
    var WebAudio = (function (_super) {
        __extends(WebAudio, _super);
        function WebAudio(type) {
            var _this = _super.call(this, type) || this;
            _this.position = 0;
            _this.$isPaused = false;
            return _this;
        }
        WebAudio.prototype.load = function () {
            this.sound = new egret.Sound();
            this.sound.type = this.type;
            this.sound.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.loadDeferred = new xgame.Deferred();
            var url = this.info.root + this.info.url;
            if (egretx.AudioManager.Instance().redirectURL) {
                url = egretx.AudioManager.Instance().redirectURL(url);
            }
            this.sound.load(url);
            return this.loadDeferred.promise;
        };
        WebAudio.prototype.onIOError = function (event) {
            console.warn("WebAudio=>onIOError", event);
            this.sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.loadDeferred.resolve(false);
        };
        WebAudio.prototype.onLoadComplete = function (event) {
            this.sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
            this.loadDeferred.resolve(true);
        };
        WebAudio.prototype.play = function (key, startTime, playTimes) {
            var _this = this;
            if (startTime === void 0) { startTime = 0; }
            if (playTimes === void 0) { playTimes = 0; }
            this.stop();
            this.key = key;
            this.playTimes = playTimes;
            this.playDeferred = new xgame.Deferred();
            this.load().then(function (success) {
                if (success) {
                    _this._play(startTime);
                }
                else {
                    _this.playDeferred.resolve();
                }
            });
            return this.playDeferred.promise;
        };
        WebAudio.prototype._play = function (position) {
            this.$isPaused = false;
            this.soundChannel = this.sound.play(position, this.playTimes);
            this.soundChannel.volume = this.volume;
            this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        };
        WebAudio.prototype.onSoundComplete = function () {
            if (this.playTimes > 0) {
                this.playTimes--;
                if (this.playTimes <= 0) {
                    if (this.playDeferred) {
                        this.playDeferred.resolve();
                    }
                    this.stop();
                }
            }
        };
        Object.defineProperty(WebAudio.prototype, "isPaused", {
            get: function () {
                return this.$isPaused;
            },
            enumerable: true,
            configurable: true
        });
        WebAudio.prototype.pause = function () {
            if (!this.isPaused && this.soundChannel) {
                this.$isPaused = true;
                this.position = this.soundChannel.position;
                this.clearChannel();
            }
        };
        WebAudio.prototype.resume = function () {
            if (this.isPaused) {
                this.$isPaused = false;
                this._play(this.position);
            }
        };
        WebAudio.prototype.clearChannel = function () {
            if (this.soundChannel) {
                this.soundChannel.stop();
                this.soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
                this.soundChannel = null;
            }
        };
        WebAudio.prototype.stop = function () {
            this.playDeferred = undefined;
            this.$isPaused = false;
            this.position = 0;
            this.clearChannel();
            if (this.sound) {
                this.sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
                this.sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOError, this);
                try {
                    this.sound.close();
                }
                catch (err) {
                }
            }
        };
        return WebAudio;
    }(egretx.Audio));
    egretx.WebAudio = WebAudio;
    __reflect(WebAudio.prototype, "egretx.WebAudio");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    egretx.IAudioManager = Symbol.for("IAudioManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    egretx.IAudioManagerInternal = Symbol.for("IAudioManagerInternal");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/

(function (egretx) {
    egretx.event = xgame.event;
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/

(function (egretx) {
    egretx.impl = xgame.impl;
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/

(function (egretx) {
    egretx.inject = xgame.inject;
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2021-11-17
*************************************************/

(function (egretx) {
    egretx.injectable = xgame.injectable;
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    /**
     * ?????????????????????
     */
    var DragonBonesManager = (function (_super) {
        __extends(DragonBonesManager, _super);
        function DragonBonesManager() {
            var _this = _super.call(this) || this;
            _this.pools = new xgame.PoolGroup("Armature");
            return _this;
        }
        DragonBonesManager.prototype.advanceTime = function (time) {
            if (!this.factory) {
                return;
            }
            this.factory.clock.advanceTime(time / 1000);
        };
        DragonBonesManager.prototype.initialize = function () {
            xgame.TimelineManager.Instance().getOrCreateTimeline().add(this);
        };
        DragonBonesManager.prototype.fetch = function (key, armatureName, texture) {
            var id = "{0}:{1}".format(key, armatureName);
            if (texture) {
                id = "{0}:{1}".format(key, texture);
            }
            var armature = this.pools.fetch(id, egretx.Armature, function () { return new egretx.Armature(key, armatureName, texture); }, this);
            return armature;
        };
        DragonBonesManager.prototype.recycle = function (armature) {
            this.pools.recycle(armature.id, egretx.Armature, armature);
        };
        DragonBonesManager.prototype.release = function (key) {
            var _this = this;
            var pools = this.pools.pools;
            pools.forKeys(function (id) {
                var id_list = id.split(":");
                if (id_list[0] == key) {
                    _this._release(id);
                }
            }, this, true);
        };
        DragonBonesManager.prototype._release = function (id) {
            if (this.pools.getPool(id, egretx.Armature).expired) {
                this.pools.release(id, egretx.Armature);
                var params = id.split(":");
                var key = params[0];
                var texture = params[2] || key;
                this.clearDragonBones(key, texture);
                egretx.ResourceManager.Instance().getOrCreateGroup(egretx.ResourceType.DragonBones).release(key);
            }
        };
        DragonBonesManager.prototype.releases = function () {
            var _this = this;
            var pools = this.pools.pools;
            pools.forKeys(function (id) {
                _this._release(id);
            }, this, true);
        };
        DragonBonesManager.prototype.addClock = function (armture) {
            if (armture.armature) {
                this.factory.clock.add(armture.armature);
            }
        };
        DragonBonesManager.prototype.removeClock = function (armture) {
            if (armture.armature) {
                this.factory.clock.remove(armture.armature);
            }
        };
        DragonBonesManager.prototype.parseDragonBones = function (key, texture) {
            texture = texture || key;
            if (!this.factory) {
                this.factory = new dragonBones.EgretFactory();
            }
            var res = this.getRes(key, texture);
            if (!this.factory.getDragonBonesData(key)) {
                this.factory.parseDragonBonesData(RES.getRes(res.skeleton), key);
            }
            if (!this.factory.getTextureAtlasData(texture)) {
                this.factory.parseTextureAtlasData(RES.getRes(res.json), RES.getRes(res.texture), texture);
            }
        };
        DragonBonesManager.prototype.clearDragonBones = function (key, texture) {
            texture = texture || key;
            var res = this.getRes(key, texture);
            if (this.factory.getDragonBonesData(key)) {
                this.factory.removeDragonBonesData(key);
                console.log("DragonBonesManager.removeDragonBonesData({0})".format(key));
            }
            if (this.factory.getTextureAtlasData(texture)) {
                this.factory.removeTextureAtlasData(texture);
                console.log("DragonBonesManager.removeTextureAtlasData({0})".format(texture));
            }
        };
        DragonBonesManager.prototype.buildArmature = function (key, armtureName) {
            return this.factory.buildArmature(armtureName, key);
        };
        DragonBonesManager.prototype.getRes = function (key, texture) {
            var res = {};
            res.skeleton = "{0}_ske_json".format(key);
            if (texture) {
                res.json = "{0}_tex_json".format(texture);
                res.texture = "{0}_tex_png".format(texture);
            }
            else {
                res.json = "{0}_tex_json".format(key);
                res.texture = "{0}_tex_png".format(key);
            }
            return res;
        };
        return DragonBonesManager;
    }(xgame.Singleton));
    egretx.DragonBonesManager = DragonBonesManager;
    __reflect(DragonBonesManager.prototype, "egretx.DragonBonesManager", ["egretx.IDragonBonesManager", "xgame.IXObject", "egretx.IDragonBonesManagerInternal", "xgame.IAnimatable"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-06
*************************************************/

(function (egretx) {
    var Armature = (function (_super) {
        __extends(Armature, _super);
        function Armature(key, armatureName, texture) {
            var _this = _super.call(this) || this;
            _this.key = key;
            _this.armatureName = armatureName;
            _this.texture = texture;
            return _this;
        }
        Object.defineProperty(Armature.prototype, "id", {
            get: function () {
                var value = this.key + ":" + this.armatureName;
                if (this.texture) {
                    value = this.key + ":" + this.texture;
                }
                return value;
            },
            enumerable: true,
            configurable: true
        });
        Armature.prototype.setParent = function (parent) {
            if (this.armature && this.armature.display) {
                parent.addChild(this.armature.display);
            }
        };
        Armature.prototype.removeSelf = function () {
            if (this.armature.display && this.armature.display.parent) {
                this.armature.display.parent.removeChild(this.armature.display);
            }
        };
        Armature.prototype.release = function () {
            this.dispose();
            if (this.armature) {
                this.armature.dispose();
            }
            this.$armature = undefined;
        };
        Armature.prototype.dispose = function () {
            if (this.armature) {
                this.armature.animation.stop();
                egretx.DragonBonesManager.Instance().removeClock(this);
            }
            this.removeSelf();
        };
        Object.defineProperty(Armature.prototype, "armature", {
            get: function () {
                return this.$armature;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Armature.prototype, "display", {
            get: function () {
                return this.armature && this.armature.display;
            },
            enumerable: true,
            configurable: true
        });
        Armature.prototype.createArmature = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!!this.armature) return [3 /*break*/, 2];
                            return [4 /*yield*/, egretx.ResourceManager.Instance().getOrCreateGroup(egretx.ResourceType.DragonBones).load(this.key, this.texture)];
                        case 1:
                            _a.sent();
                            egretx.DragonBonesManager.Instance().parseDragonBones(this.key, this.texture);
                            this.$armature = egretx.DragonBonesManager.Instance().buildArmature(this.key, this.armatureName);
                            _a.label = 2;
                        case 2:
                            if (this.armature) {
                                egretx.DragonBonesManager.Instance().addClock(this);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return Armature;
    }(xgame.XObject));
    egretx.Armature = Armature;
    __reflect(Armature.prototype, "egretx.Armature", ["xgame.IPoolable", "xgame.IDisposable", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    egretx.IDragonBonesManager = Symbol.for("IDragonBonesManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-05
*************************************************/

(function (egretx) {
    egretx.IDragonBonesManagerInternal = Symbol.for("IDragonBonesManagerInternal");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/

(function (egretx) {
    var GuideManager = (function (_super) {
        __extends(GuideManager, _super);
        function GuideManager() {
            var _this = _super.call(this) || this;
            //???????????????
            _this.tasks = new xgame.Dictionary();
            //?????????
            _this.disposableGroup = new xgame.DisposableGroup();
            //?????????????????????
            _this.values = new xgame.Dictionary();
            //??????????????????ID
            _this.completedIDList = [];
            _this.isFirstClean = true;
            _this.$isStarted = false;
            _this.$isPaused = false;
            return _this;
        }
        /**
         * ?????????
         */
        GuideManager.prototype.initialize = function () {
            this.disposableGroup.registerUpdate(this.advanceTime, this);
        };
        GuideManager.prototype.isCompleted = function (id) {
            return this.completedIDList.indexOf(id) >= 0;
        };
        /**
         * ??????????????????
         * @param id
         */
        GuideManager.prototype.getTask = function (id) {
            return this.tasks.get(id);
        };
        /**
         * ??????????????????
         * @param id
         * @param index
         * @returns
         */
        GuideManager.prototype.getStep = function (id, index) {
            if (this.tasks.containsKey(id)) {
                return this.tasks.get(id).getStep(index);
            }
        };
        /**
         * ??????????????????
         * @param task
         * @returns
         */
        GuideManager.prototype.addTask = function (task) {
            if (task.ID && !this.tasks.containsKey(task.ID)) {
                this.tasks.add(task.ID, task);
                xgame.injectInstance(task);
                task.onInit();
            }
            else {
                throw new Error("??????????????????({0})??????".format(task.ID));
            }
            return task;
        };
        /**
         * ????????????????????????
         * @param taskID ???????????????taskID??????????????????taskID?????????
         */
        GuideManager.prototype.clearValues = function (taskID) {
            if (taskID) {
                if (this.tasks.containsKey(taskID)) {
                    this.tasks.get(taskID).clearValues();
                }
            }
            else {
                this.values.clear();
            }
        };
        /**
         * ???????????????????????????
         * @param key
         * @param value
         * @param taskID
         */
        GuideManager.prototype.injectValue = function (key, value, taskID) {
            if (taskID) {
                if (this.tasks.containsKey(taskID)) {
                    this.tasks.get(taskID).injectValue(key, value);
                }
            }
            else {
                this.values.set(key, value);
            }
        };
        /**
         * ??????????????????
         * @param key
         * @param taskID
         */
        GuideManager.prototype.removeValue = function (key, taskID) {
            if (taskID) {
                if (this.tasks.containsKey(taskID)) {
                    this.tasks.get(taskID).removeValue(key);
                }
            }
            else {
                this.values.remove(key);
            }
        };
        /**
         * ??????????????????????????????
         * @param key
         * @param defaultValue
         * @param taskID
         */
        GuideManager.prototype.retrieveValue = function (key, defaultValue, taskID) {
            if (taskID) {
                if (this.tasks.containsKey(taskID)) {
                    return this.tasks.get(taskID).retrieveValue(key, defaultValue);
                }
            }
            else {
                if (this.values.containsKey(key)) {
                    return this.values.get(key);
                }
            }
            return defaultValue;
        };
        /**
         * ?????????
         */
        GuideManager.prototype.advanceTime = function () {
            var _this = this;
            if (!this.isStarted) {
                return;
            }
            if (this.isPaused) {
                return;
            }
            //??????????????????????????????????????????????????????????????????????????????
            if (this.isFirstClean) {
                this.isFirstClean = false;
                this.tasks.forValues(function (task) {
                    if (task.checkRemoveWithCompleted()) {
                        _this.tasks.remove(task.ID);
                        if (_this.completedIDList.indexOf(task.ID) == -1) {
                            _this.completedIDList.push(task.ID);
                        }
                        task.dispose();
                    }
                }, this, true);
            }
            //???????????????????????????
            if (this.activityTask) {
                //??????????????????????????????????????????????????????
                if (this.activityTask.checkComplete()) {
                    this.activityTask.onComplete();
                    this.tasks.remove(this.activityTask.ID);
                    if (this.completedIDList.indexOf(this.activityTask.ID) == -1) {
                        this.completedIDList.push(this.activityTask.ID);
                    }
                    this.activityTask.dispose();
                    this.$activityTask = undefined;
                }
                else {
                    this.activityTask.advanceTime();
                }
                return;
            }
            //?????????????????????????????????
            this.tasks.forValues(function (task) {
                //???????????????????????????????????????
                if (task.checkBegin()) {
                    _this.$activityTask = task;
                    task.onBegin();
                    return true;
                }
            }, this);
        };
        Object.defineProperty(GuideManager.prototype, "activityTask", {
            get: function () {
                return this.$activityTask;
            },
            enumerable: true,
            configurable: true
        });
        GuideManager.prototype.setActivityTask = function (value) {
            this.$activityTask = value;
        };
        Object.defineProperty(GuideManager.prototype, "isStarted", {
            get: function () {
                return this.$isStarted;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * ??????????????????
         */
        GuideManager.prototype.start = function () {
            if (this.isStarted) {
                return;
            }
            this.$isStarted = true;
        };
        Object.defineProperty(GuideManager.prototype, "isPaused", {
            get: function () {
                return this.$isPaused;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * ???????????????????????????????????????
         * @returns
         */
        GuideManager.prototype.pause = function () {
            if (!this.isStarted) {
                return;
            }
            if (this.activityTask) {
                return;
            }
            if (this.isPaused) {
                return;
            }
            this.$isPaused = true;
        };
        /**
         * ???????????????????????????????????????
         * @returns
         */
        GuideManager.prototype.resume = function () {
            if (!this.isStarted) {
                return;
            }
            if (this.activityTask) {
                return;
            }
            if (!this.isPaused) {
                return;
            }
            this.$isPaused = false;
        };
        /**
         * ?????????????????????????????????????????????????????????????????????
         */
        GuideManager.prototype.cancelActiveTask = function () {
            if (this.isStarted && this.activityTask && this.activityTask.state != egretx.GuideTaskState.Completed) {
                this.activityTask.onCancel();
                this.guideHelper.cancelGuide(this.activityTask.ID);
                this.$activityTask = undefined;
                this.pause();
                return true;
            }
            return false;
        };
        return GuideManager;
    }(xgame.Singleton));
    egretx.GuideManager = GuideManager;
    __reflect(GuideManager.prototype, "egretx.GuideManager", ["egretx.IGuideManager", "xgame.IXObject", "egretx.IGuideManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/

(function (egretx) {
    var GuideStepState;
    (function (GuideStepState) {
        GuideStepState[GuideStepState["Ready"] = 0] = "Ready";
        GuideStepState[GuideStepState["Running"] = 1] = "Running";
        GuideStepState[GuideStepState["Completed"] = 2] = "Completed";
    })(GuideStepState = egretx.GuideStepState || (egretx.GuideStepState = {}));
    var GuideStep = (function (_super) {
        __extends(GuideStep, _super);
        /**
         * @param parent ??????????????????
         * @param index ?????????
         */
        function GuideStep(parent, index, params) {
            var _this = _super.call(this) || this;
            _this.parent = parent;
            _this.index = index;
            _this.params = params;
            _this.$state = GuideStepState.Ready;
            return _this;
        }
        Object.defineProperty(GuideStep.prototype, "taskID", {
            get: function () {
                return this.parent && this.parent.ID;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuideStep.prototype, "target", {
            get: function () {
                return this.params.target;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuideStep.prototype, "tips", {
            get: function () {
                return this.params.tips;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GuideStep.prototype, "state", {
            get: function () {
                return this.$state;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * ????????????
         * @param value
         */
        GuideStep.prototype.setState = function (value) {
            this.$state = value;
        };
        /**
         * ????????????
         */
        GuideStep.prototype.reset = function () {
            this.$state = GuideStepState.Ready;
        };
        /**
         * ??????????????????????????????????????????????????????
         */
        GuideStep.prototype.advanceTime = function () {
        };
        /**
         * ??????
         */
        GuideStep.prototype.dispose = function () {
        };
        /**
         * ??????????????????
         */
        GuideStep.prototype.onBegin = function () {
            egretx.GuideManager.Instance().guideHelper.beginGuide(this.parent.ID, this.index);
        };
        /**
         * ??????????????????
         */
        GuideStep.prototype.onComplete = function () {
            egretx.GuideManager.Instance().guideHelper.endGuide(this.parent.ID, this.index);
        };
        return GuideStep;
    }(xgame.XObject));
    egretx.GuideStep = GuideStep;
    __reflect(GuideStep.prototype, "egretx.GuideStep", ["xgame.IDisposable", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/

(function (egretx) {
    var GuideTaskState;
    (function (GuideTaskState) {
        GuideTaskState[GuideTaskState["Ready"] = 0] = "Ready";
        GuideTaskState[GuideTaskState["Running"] = 1] = "Running";
        GuideTaskState[GuideTaskState["Completed"] = 2] = "Completed";
    })(GuideTaskState = egretx.GuideTaskState || (egretx.GuideTaskState = {}));
    var GuideTaskType;
    (function (GuideTaskType) {
        GuideTaskType[GuideTaskType["Weak"] = 0] = "Weak";
        GuideTaskType[GuideTaskType["Force"] = 1] = "Force";
    })(GuideTaskType = egretx.GuideTaskType || (egretx.GuideTaskType = {}));
    var GuideTask = (function (_super) {
        __extends(GuideTask, _super);
        /**
         * ????????????
         * @param ID ??????id
         * @param taskType ????????????
         * @param frontID ????????????ID????????????????????????????????????????????????????????????
         */
        function GuideTask(ID, taskType, frontID) {
            if (taskType === void 0) { taskType = GuideTaskType.Weak; }
            var _this = _super.call(this) || this;
            _this.ID = ID;
            _this.taskType = taskType;
            _this.frontID = frontID;
            _this.values = new xgame.Dictionary();
            _this.steps = new xgame.Dictionary();
            /**
             * ???????????????????????????
             */
            _this.$activeIndex = -1;
            _this.$state = GuideTaskState.Ready;
            return _this;
        }
        GuideTask.prototype.getStep = function (index) {
            return this.steps.get(index);
        };
        GuideTask.prototype.addStep = function (step_or_params) {
            var step;
            if (step_or_params instanceof egretx.GuideStep) {
                step = step_or_params;
                step.index = this.steps.length;
                step.parent = this;
            }
            else {
                step = new egretx.GuideStep(this, this.steps.length, step_or_params);
                step.checkBegin = step_or_params.checkBegin;
                step.checkComplete = step_or_params.checkComplete;
            }
            this.steps.add(step.index, step);
        };
        Object.defineProperty(GuideTask.prototype, "activeIndex", {
            get: function () {
                return this.$activeIndex;
            },
            enumerable: true,
            configurable: true
        });
        GuideTask.prototype.setActiveIndex = function (value) {
            var _this = this;
            this.$activeIndex = value;
            //???????????????????????????????????????
            this.steps.forValues(function (step) {
                if (step.index != value && _this.taskType == GuideTaskType.Weak) {
                    step.reset();
                }
            }, this, true);
        };
        /**
         * ??????????????????????????????
         */
        GuideTask.prototype.onInit = function () {
        };
        /**
         * ???????????????????????????????????????????????????
         * @returns
         */
        GuideTask.prototype.checkRemoveWithCompleted = function () {
            return false;
        };
        /**
         * ??????????????????????????????????????????????????????
         * @returns
         */
        GuideTask.prototype.checkBegin = function () {
            if (this.frontID && !egretx.GuideManager.Instance().isCompleted(this.frontID)) {
                return false;
            }
            return true;
        };
        /**
         * ????????????????????????
         */
        GuideTask.prototype.onBegin = function () {
            this.$state = GuideTaskState.Running;
        };
        /**
         * ???????????????????????????????????????????????????
         * @returns
         */
        GuideTask.prototype.checkComplete = function () {
            //??????????????????????????????????????????????????????????????????
            if (this.steps.last().value.state == egretx.GuideStepState.Completed) {
                return true;
            }
            return false;
        };
        /**
         * ????????????????????????
         */
        GuideTask.prototype.onComplete = function () {
            this.$state = GuideTaskState.Completed;
        };
        /**
         * ?????????????????????
         */
        GuideTask.prototype.onCancel = function () {
            this.$activeIndex = -1;
            this.steps.forValues(function (step) {
                step.reset();
            }, this);
        };
        /**
         * ????????????
         */
        GuideTask.prototype.reset = function () {
            this.$state = GuideTaskState.Ready;
            this.values.clear();
            this.$activeIndex = -1;
        };
        /**
         * ??????
         */
        GuideTask.prototype.advanceTime = function () {
            var _this = this;
            if (this.activeIndex >= 0) {
                var step = this.getStep(this.activeIndex);
                if (step.state === egretx.GuideStepState.Ready) {
                    if (step.checkBegin()) {
                        step.setState(egretx.GuideStepState.Running);
                        step.onBegin();
                    }
                }
                else if (step.state === egretx.GuideStepState.Running) {
                    step.advanceTime();
                    if (step.checkComplete()) {
                        step.setState(egretx.GuideStepState.Completed);
                        step.onComplete();
                        if (step.index < this.steps.length - 1) {
                            this.$activeIndex++;
                        }
                    }
                }
            }
            else {
                this.steps.forValues(function (step) {
                    if (_this.activeIndex == -1) {
                        if (step.checkBegin()) {
                            step.setState(egretx.GuideStepState.Running);
                            step.onBegin();
                            _this.$activeIndex = step.index;
                            return true;
                        }
                    }
                }, this, true);
            }
        };
        /**
         * ??????
         */
        GuideTask.prototype.dispose = function () {
            this.steps.clear(function (step) {
                step.dispose();
            });
            this.values.clear();
        };
        Object.defineProperty(GuideTask.prototype, "state", {
            get: function () {
                return this.$state;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * ????????????
         * @param value
         */
        GuideTask.prototype.setState = function (value) {
            this.$state = value;
        };
        /**
         * ????????????????????????
         */
        GuideTask.prototype.clearValues = function () {
            this.values.clear();
        };
        /**
         * ???????????????????????????
         * @param key
         * @param value
         * @param taskID
         */
        GuideTask.prototype.injectValue = function (key, value) {
            this.values.set(key, value);
        };
        GuideTask.prototype.removeValue = function (key) {
            this.values.remove(key);
        };
        /**
         * ??????????????????????????????
         * @param key
         * @param defaultValue
         * @param taskID
         */
        GuideTask.prototype.retrieveValue = function (key, defaultValue) {
            if (this.values.containsKey(key)) {
                return this.values.get(key);
            }
            return defaultValue;
        };
        return GuideTask;
    }(xgame.XObject));
    egretx.GuideTask = GuideTask;
    __reflect(GuideTask.prototype, "egretx.GuideTask", ["xgame.IDisposable", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/

(function (egretx) {
    egretx.IGuideManager = Symbol.for("IGuideManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-08
*************************************************/

(function (egretx) {
    egretx.IGuideManagerInternal = Symbol.for("IGuideManagerInternal");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/

(function (egretx) {
    egretx.IHttpManager = Symbol.for("IHttpManager");
    egretx.IHttpManagerInternal = Symbol.for("IHttpManagerInternal");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
/// <reference path="./interfaces/IHttpManager.ts" />

(function (egretx) {
    var HttpManager = (function (_super) {
        __extends(HttpManager, _super);
        function HttpManager() {
            var _this = _super.call(this) || this;
            _this.pools = new xgame.PoolObject(egretx.HttpRequest);
            return _this;
        }
        HttpManager.prototype.initialize = function () {
        };
        HttpManager.prototype.sendRequest = function (uri_or_options, method, values, isJSON) {
            return __awaiter(this, void 0, void 0, function () {
                var options, httpRequest, i, i, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (typeof (uri_or_options) == "string") {
                                options = {
                                    uri: uri_or_options,
                                    method: method,
                                    values: values,
                                    isJSON: isJSON
                                };
                            }
                            else {
                                options = uri_or_options;
                            }
                            httpRequest = this.pools.fetch(function () { return new egretx.HttpRequest(options.uri, options.method); }, this);
                            if (options.headers) {
                                for (i = 0; i < options.headers.length; i++) {
                                    httpRequest.setHeader(options.headers[i][0], options.headers[i][1]);
                                }
                            }
                            if (options.values) {
                                for (i = 0; i < options.values.length; i++) {
                                    httpRequest.setValue(options.values[i][0], options.values[i][1]);
                                }
                            }
                            return [4 /*yield*/, httpRequest.send(options.isJSON)];
                        case 1:
                            response = _a.sent();
                            this.pools.recycle(httpRequest);
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        HttpManager = __decorate([
            egretx.impl(egretx.IHttpManager),
            __metadata("design:paramtypes", [])
        ], HttpManager);
        return HttpManager;
    }(xgame.Singleton));
    egretx.HttpManager = HttpManager;
    __reflect(HttpManager.prototype, "egretx.HttpManager", ["egretx.IHttpManager", "xgame.IXObject", "egretx.IHttpManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/

(function (egretx) {
    egretx.ISocketManager = Symbol.for("ISocketManager");
    egretx.ISocketManagerInternal = Symbol.for("ISocketManagerInternal");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/
/// <reference path="./interfaces/ISocketManager.ts" />

(function (egretx) {
    var SocketManager = (function (_super) {
        __extends(SocketManager, _super);
        function SocketManager() {
            var _this = _super.call(this) || this;
            _this.defaultInstanceName = "main";
            //????????????????????????
            _this.retryMaxTiems = 3;
            //??????????????????(??????)
            _this.retryDelayTime = 5000;
            //??????????????????(??????)
            _this.sendTimeout = 10000;
            //??????????????????(??????)
            _this.heartBeatCheckTimeout = 10000;
            _this.instances = new xgame.Dictionary();
            return _this;
        }
        SocketManager.prototype.initialize = function () {
        };
        SocketManager.prototype.getOrCreateInstance = function (name, helper) {
            name = name || this.defaultInstanceName;
            if (!this.instances.containsKey(name)) {
                var instance = new egretx.SocketInstance(this, name, helper || this.defaultSocketHelper);
                this.instances.push(name, instance);
            }
            return this.instances.get(name);
        };
        SocketManager = __decorate([
            egretx.impl(egretx.ISocketManager),
            __metadata("design:paramtypes", [])
        ], SocketManager);
        return SocketManager;
    }(xgame.Singleton));
    egretx.SocketManager = SocketManager;
    __reflect(SocketManager.prototype, "egretx.SocketManager", ["egretx.ISocketManager", "xgame.IXObject", "egretx.ISocketManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/

(function (egretx) {
    var HttpRequest = (function (_super) {
        __extends(HttpRequest, _super);
        function HttpRequest(uri, method) {
            var _this = _super.call(this) || this;
            _this.uri = uri;
            _this.method = method;
            _this.reconnectTimes = 5;
            _this.headers = new xgame.Dictionary();
            _this.values = new xgame.Dictionary();
            return _this;
        }
        HttpRequest.prototype.release = function () {
        };
        HttpRequest.prototype.dispose = function () {
            this.headers.clear();
            this.values.clear();
            this.uri = undefined;
            this.method = undefined;
        };
        HttpRequest.prototype.setUri = function (uri) {
            this.uri = uri;
        };
        HttpRequest.prototype.setMethod = function (method) {
            if (method === void 0) { method = egret.HttpMethod.GET; }
            this.method = method;
        };
        HttpRequest.prototype.setHeader = function (key, value) {
            this.headers.set(key, value);
        };
        HttpRequest.prototype.setValue = function (key, value) {
            this.values.set(key, value);
        };
        HttpRequest.prototype.send = function (isJSON) {
            return __awaiter(this, void 0, void 0, function () {
                var response, times, resp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            times = this.reconnectTimes;
                            _a.label = 1;
                        case 1:
                            if (!times) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.request()];
                        case 2:
                            response = _a.sent();
                            if (!(typeof (response) === "boolean")) return [3 /*break*/, 4];
                            times--;
                            return [4 /*yield*/, xgame.waitMilliseconds(500)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4: return [3 /*break*/, 6];
                        case 5: return [3 /*break*/, 1];
                        case 6:
                            if (typeof (response) === "boolean") {
                                return [2 /*return*/, undefined];
                            }
                            if (!isJSON) {
                                return [2 /*return*/, response];
                            }
                            try {
                                resp = JSON.parse(response);
                                return [2 /*return*/, resp];
                            }
                            catch (err) {
                            }
                            return [2 /*return*/, undefined];
                    }
                });
            });
        };
        HttpRequest.prototype.request = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.method = this.method || egret.HttpMethod.GET;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var req = new egret.HttpRequest();
                            req.open(_this.uri, _this.method);
                            if (_this.method == egret.HttpMethod.GET || _this.values.length == 0) {
                                req.send();
                            }
                            else {
                                req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                var sendData_1 = "";
                                _this.headers.forKeys(function (key) {
                                    req.setRequestHeader(key, _this.headers.get(key));
                                }, _this);
                                _this.values.forKeys(function (key) {
                                    sendData_1 += key + "=" + _this.values.get(key) + "&";
                                }, _this);
                                req.send(sendData_1);
                            }
                            req.addEventListener(egret.Event.COMPLETE, function () {
                                resolve(req.response);
                            }, _this);
                            req.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
                                resolve(false);
                            }, _this);
                        })];
                });
            });
        };
        return HttpRequest;
    }(xgame.XObject));
    egretx.HttpRequest = HttpRequest;
    __reflect(HttpRequest.prototype, "egretx.HttpRequest", ["xgame.IPoolable", "xgame.IDisposable", "xgame.IXObject"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-01
*************************************************/

(function (egretx) {
    var SocketState;
    (function (SocketState) {
        SocketState[SocketState["Closed"] = 0] = "Closed";
        SocketState[SocketState["Connecting"] = 1] = "Connecting";
        SocketState[SocketState["Connected"] = 2] = "Connected";
    })(SocketState = egretx.SocketState || (egretx.SocketState = {}));
    var SocketCloseCode;
    (function (SocketCloseCode) {
        SocketCloseCode[SocketCloseCode["Close"] = 0] = "Close";
        SocketCloseCode[SocketCloseCode["IOError"] = 1] = "IOError";
        SocketCloseCode[SocketCloseCode["Failed"] = 2] = "Failed";
    })(SocketCloseCode = egretx.SocketCloseCode || (egretx.SocketCloseCode = {}));
    /**
     * ??????????????????????????????
     */
    var SocketInstance = (function (_super) {
        __extends(SocketInstance, _super);
        function SocketInstance(manager, name, socketHelper) {
            var _this = _super.call(this) || this;
            _this.manager = manager;
            _this.name = name;
            _this.socketHelper = socketHelper;
            _this.guidCount = 0;
            _this.isInited = false;
            _this.happendConnected = false;
            _this.isReconnect = false;
            _this.disposableGroup = new xgame.DisposableGroup();
            _this.recvQueues = [];
            _this.sendTimeoutStamp = 0;
            _this.lastestRecvStamp = 0;
            _this.checkHeartBeat = false;
            _this.sendQueues = [];
            _this.callback_onConnected = new xgame.Signal0();
            _this.callback_onKickOut = new xgame.Signal0();
            _this.callback_onClosed = new xgame.Signal1();
            _this.reconnectTimerID = 0;
            _this.callback_onConnecting = new xgame.Signal1();
            _this.retryCount = 0;
            _this.callback_onShutdown = new xgame.Signal0();
            return _this;
        }
        SocketInstance.prototype.generateGUID = function () {
            return ++this.guidCount;
        };
        Object.defineProperty(SocketInstance.prototype, "state", {
            get: function () {
                return this.$state;
            },
            enumerable: true,
            configurable: true
        });
        SocketInstance.prototype.onAdvanceTime = function () {
            while (this.recvQueues.length) {
                var packet = this.recvQueues.shift();
                //????????????????????????
                if (packet.guid && this.current && this.current.guid == packet.guid) {
                    if (this.socketHelper.needSendLoginPacket() && this.socketHelper.isLoginRespPacket(packet)) {
                        if (this.socketHelper.isLoginSuccess(packet)) {
                            this.isReconnect = true;
                        }
                    }
                    this.current = null;
                    this.sendQueues.shift();
                }
                this.socketHelper.receivePacket(packet);
            }
            if (this.state == SocketState.Connected) {
                //?????????????????????????????????
                if (!this.current && this.sendQueues.length) {
                    this.current = this.sendQueues[0];
                    this._sendPacket(this.current);
                    this.sendTimeoutStamp = xgame.Time.Instance().passedTime + this.manager.sendTimeout;
                }
                //????????????
                if (this.current && this.sendTimeoutStamp < xgame.Time.Instance().passedTime) {
                    this._close();
                    this.connect();
                }
                //????????????
                if (this.socketHelper.enableHeartBeatCheck()) {
                    if (!this.checkHeartBeat && xgame.Time.Instance().getTimeStamp() - this.lastestRecvStamp > this.manager.heartBeatCheckTimeout) {
                        this.checkHeartBeat = true;
                        this.socketHelper.sendHeartBeatPacket();
                    }
                }
            }
        };
        SocketInstance.prototype._sendPacket = function (packet) {
            this.socketHelper.showAnimation();
            var buffer = this.socketHelper.encodePacket(packet);
            if (buffer && buffer.length) {
                this.socket.writeBytes(buffer);
            }
        };
        SocketInstance.prototype.sendPacket = function (packet) {
            packet.guid = this.generateGUID();
            if (packet.first) {
                for (var i = this.sendQueues.length - 1; i >= 0; i++) {
                    if (this.socketHelper.isLoginRespPacket(this.sendQueues[i])) {
                        this.sendQueues.splice(i, 1);
                    }
                }
                this.sendQueues.unshift(packet);
            }
            else {
                this.sendQueues.push(packet);
            }
        };
        SocketInstance.prototype.setURI = function (host_or_uri, port, wss) {
            if (port) {
                this.uri = wss ? "wss://" : "ws://" + host_or_uri + ":" + port;
            }
            else {
                this.uri = host_or_uri;
            }
        };
        SocketInstance.prototype.init = function () {
            if (this.isInited) {
                return;
            }
            this.isInited = true;
            this.guidCount = Math.floor(xgame.Time.Instance().getTimeStamp() / 1000);
            this.cleanQueues();
            this.disposableGroup.registerUpdate(this.onAdvanceTime, this);
            this.socket = new egret.WebSocket();
            this.socket.type = egret.WebSocket.TYPE_BINARY;
            this.socket.addEventListener(egret.Event.CONNECT, this.onConnectHandler, this);
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveHandler, this);
            this.socket.addEventListener(egret.Event.CLOSE, this.onCloseHandler, this);
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorHandler, this);
            this.$state = SocketState.Closed;
        };
        SocketInstance.prototype.onConnected = function () {
            return this.callback_onConnected;
        };
        SocketInstance.prototype.onConnectHandler = function (event) {
            this.$state = SocketState.Connected;
            this.socketHelper.hideAnimation();
            this.callback_onConnected.dispatch();
            this.happendConnected = true;
            if (this.socketHelper.needSendLoginPacket()) {
                this.sendLoginPacket();
            }
        };
        SocketInstance.prototype.sendLoginPacket = function () {
            var packet = this.socketHelper.generateLoginPacket(this.isReconnect);
            if (packet) {
                packet.first = true;
                this.sendPacket(packet);
            }
        };
        SocketInstance.prototype.onKickOut = function () {
            return this.callback_onKickOut;
        };
        SocketInstance.prototype.onReceiveHandler = function (event) {
            var _this = this;
            this.socketHelper.hideAnimation();
            this.lastestRecvStamp = xgame.Time.Instance().getTimeStamp();
            var buffer = new egret.ByteArray();
            this.socket.readBytes(buffer);
            var packets = this.socketHelper.decodePackets(buffer);
            if (packets && packets.length) {
                var packet = packets[0];
                if (this.socketHelper.isDataLocked(packet)) {
                    egret.setTimeout(function () {
                        _this.current = null;
                    }, this, 100);
                }
                else if (this.socketHelper.isKickOutPacket(packet)) {
                    this.callback_onKickOut.dispatch();
                }
                else {
                    this.recvQueues.push(packet);
                    if (this.socketHelper.isHeartBeatPacket(packet)) {
                        this.checkHeartBeat = false;
                    }
                }
                if (packets.length > 1) {
                    for (var i = 1; i < packets.length; i++) {
                        this.recvQueues.push(packets[i]);
                    }
                }
            }
        };
        SocketInstance.prototype.onClosed = function () {
            return this.callback_onClosed;
        };
        SocketInstance.prototype.onCloseHandler = function (event) {
            var _this = this;
            this.callback_onClosed.dispatch(SocketCloseCode.Close);
            if (this.state == SocketState.Connecting) {
                // 1.????????????/??????
                // 2.??????
                // ???????????????????????????
                this.reconnectTimerID = egret.setTimeout(function () {
                    _this._connect();
                }, this, this.manager.retryDelayTime);
            }
            else if (this.state == SocketState.Connected) {
                // 1.????????????
                // 2.??????????????????
                // 3.???????????????
                this.$state = SocketState.Closed;
                this.connect();
            }
        };
        SocketInstance.prototype.onIOErrorHandler = function (event) {
            this.socketHelper.hideAnimation();
            this.cleanQueues(true);
            this.$state = SocketState.Closed;
            this.callback_onClosed.dispatch(SocketCloseCode.IOError);
        };
        SocketInstance.prototype.onConnecting = function () {
            return this.callback_onConnecting;
        };
        SocketInstance.prototype.connect = function () {
            if (!this.socketHelper) {
                throw new Error("????????????????????????ISocketHelper");
            }
            if (!this.isInited) {
                this.init();
            }
            if (this.state != SocketState.Closed) {
                return;
            }
            this.socketHelper.showAnimation();
            this.retryCount = 0;
            this.$state = SocketState.Connecting;
            this._connect();
        };
        SocketInstance.prototype._connect = function () {
            if (this.state != SocketState.Connecting) {
                return;
            }
            if (this.retryCount < this.manager.retryMaxTiems) {
                if (this.happendConnected) {
                    this.callback_onConnecting.dispatch(this.retryCount + 1);
                }
                this.socket.connectByUrl(this.uri);
                this.retryCount++;
            }
            else {
                this.cleanQueues();
                this.$state = SocketState.Closed;
                this.socketHelper.hideAnimation();
                this.callback_onClosed.dispatch(SocketCloseCode.Failed);
            }
        };
        SocketInstance.prototype.cleanQueues = function (revc) {
            while (this.sendQueues.length > 0) {
                var packet = this.sendQueues.pop();
                packet.abort();
            }
            if (revc) {
                this.recvQueues.length = 0;
            }
        };
        SocketInstance.prototype.close = function () {
            if (this.state != SocketState.Closed) {
                this._close();
            }
        };
        SocketInstance.prototype._close = function () {
            if (this.state != SocketState.Closed) {
                this.$state = SocketState.Closed;
                if (this.socket) {
                    this.socket.close();
                }
            }
            if (this.reconnectTimerID) {
                egret.clearTimeout(this.reconnectTimerID);
                this.reconnectTimerID = 0;
            }
        };
        SocketInstance.prototype.onShutdown = function () {
            return this.callback_onShutdown;
        };
        SocketInstance.prototype.shutdown = function () {
            this.guidCount = Math.floor(xgame.Time.Instance().getTimeStamp() / 1000);
            if (this.socket) {
                this.socket.removeEventListener(egret.Event.CONNECT, this.onConnectHandler, this);
                this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveHandler, this);
                this.socket.removeEventListener(egret.Event.CLOSE, this.onCloseHandler, this);
                this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onIOErrorHandler, this);
            }
            this.close();
            this.cleanQueues(true);
            this.isInited = false;
            this.happendConnected = false;
            this.isReconnect = false;
            this.socket = null;
            this.$state = SocketState.Closed;
            this.callback_onShutdown.dispatch();
        };
        return SocketInstance;
    }(xgame.XObject));
    egretx.SocketInstance = SocketInstance;
    __reflect(SocketInstance.prototype, "egretx.SocketInstance");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    /**
     * ???????????????
     */
    var ResourceManager = (function (_super) {
        __extends(ResourceManager, _super);
        function ResourceManager() {
            var _this = _super.call(this) || this;
            _this.groups = new xgame.Dictionary();
            _this.loadQueues = new xgame.Dictionary();
            return _this;
        }
        ResourceManager.prototype.initialize = function () {
            this.groups.add(egretx.ResourceType.MovieClip, new egretx.MovieClipResourceGroup(this));
            this.groups.add(egretx.ResourceType.DragonBones, new egretx.DragonBonesResourceGroup(this));
        };
        ResourceManager.prototype.getOrCreateGroup = function (name, factory) {
            var group = this.groups.get(name);
            if (!group && factory) {
                group = factory();
                this.groups.add(name, group);
            }
            return group;
        };
        ResourceManager.prototype.loadResAsync = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                var loader;
                return __generator(this, function (_a) {
                    if (!RES.hasRes(key)) {
                        throw new Error("????????????:{0}?????????".format(key));
                    }
                    if (RES.getRes(key)) {
                        return [2 /*return*/, RES.getRes(key)];
                    }
                    if (!this.loadQueues.containsKey(key)) {
                        loader = { key: key, deferred: new xgame.Deferred() };
                        this.loadQueues.add(key, loader);
                        RES.getResAsync(key).then(function () {
                            loader = _this.loadQueues.remove(key);
                            loader.deferred.resolve(RES.getRes(key));
                        });
                    }
                    else {
                        loader = this.loadQueues.get(key);
                    }
                    return [2 /*return*/, loader.deferred.promise];
                });
            });
        };
        ResourceManager.prototype.destroyRes = function (key) {
            if (RES.getRes(key)) {
                if (ResourceManager.DEBUG) {
                    console.log("ResourceManager.destroyRes({0})".format(key));
                }
                return RES.destroyRes(key, true);
            }
            return false;
        };
        ResourceManager.DEBUG = true;
        return ResourceManager;
    }(xgame.Singleton));
    egretx.ResourceManager = ResourceManager;
    __reflect(ResourceManager.prototype, "egretx.ResourceManager", ["egretx.IResourceManager", "xgame.IXObject", "egretx.IResourceManagerInternal"]);
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    /**
     * ?????????
     */
    var ResourceGroup = (function (_super) {
        __extends(ResourceGroup, _super);
        function ResourceGroup(manager, resourceType) {
            var _this = _super.call(this) || this;
            _this.manager = manager;
            _this.resourceType = resourceType;
            _this.keys = new xgame.Dictionary();
            _this.statistics = {};
            _this.$memory = 0;
            return _this;
        }
        ResourceGroup.prototype.createInstance = function (key) {
            return null;
        };
        ResourceGroup.prototype.load = function (key) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            });
        };
        ResourceGroup.prototype.release = function (key) {
            if (this.keys.containsKey(key)) {
                var list = this.keys.get(key);
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var res = list_1[_i];
                    egretx.ResourceManager.Instance().destroyRes(res);
                }
            }
        };
        Object.defineProperty(ResourceGroup.prototype, "memory", {
            get: function () {
                return this.$memory;
            },
            enumerable: true,
            configurable: true
        });
        ResourceGroup.prototype.addMemory = function (key, w, h) {
            if (this.statistics[key] == undefined) {
                var m = w * h * 4;
                this.statistics[key] = m;
                this.$memory += m;
            }
        };
        ResourceGroup.prototype.removeMemory = function (key) {
            if (this.statistics[key] != undefined) {
                var m = this.statistics[key];
                this.$memory -= m;
                delete this.statistics[key];
            }
        };
        return ResourceGroup;
    }(xgame.XObject));
    egretx.ResourceGroup = ResourceGroup;
    __reflect(ResourceGroup.prototype, "egretx.ResourceGroup");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
/// <reference path="./ResourceGroup.ts" />

(function (egretx) {
    var DragonBonesResourceGroup = (function (_super) {
        __extends(DragonBonesResourceGroup, _super);
        function DragonBonesResourceGroup(manager) {
            return _super.call(this, manager, egretx.ResourceType.DragonBones) || this;
        }
        DragonBonesResourceGroup.prototype.load = function (key, skeleton) {
            return __awaiter(this, void 0, void 0, function () {
                var res, texture, list;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res = egretx.DragonBonesManager.Instance().getRes(key, skeleton);
                            if (!RES.hasRes(res.json) || !RES.hasRes(res.texture) || !RES.hasRes(res.skeleton)) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.skeleton)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.json)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.texture)];
                        case 3:
                            texture = _a.sent();
                            if (texture) {
                                this.addMemory(key, texture.$bitmapWidth, texture.$bitmapHeight);
                            }
                            if (!this.keys.containsKey(key)) {
                                list = [res.json, res.texture, res.skeleton];
                                this.keys.add(key, list);
                            }
                            else {
                                list = this.keys.get(key);
                                if (list.indexOf(res.json) == -1) {
                                    list.push(res.json);
                                }
                                if (list.indexOf(res.texture) == -1) {
                                    list.push(res.texture);
                                }
                                if (list.indexOf(res.skeleton) == -1) {
                                    list.push(res.skeleton);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return DragonBonesResourceGroup;
    }(egretx.ResourceGroup));
    egretx.DragonBonesResourceGroup = DragonBonesResourceGroup;
    __reflect(DragonBonesResourceGroup.prototype, "egretx.DragonBonesResourceGroup");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/
/// <reference path="./ResourceGroup.ts" />

(function (egretx) {
    var MovieClipResourceGroup = (function (_super) {
        __extends(MovieClipResourceGroup, _super);
        function MovieClipResourceGroup(manager) {
            return _super.call(this, manager, egretx.ResourceType.MovieClip) || this;
        }
        MovieClipResourceGroup.prototype.load = function (key) {
            return __awaiter(this, void 0, void 0, function () {
                var res, texture, list;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            res = egretx.AnimationManager.Instance().getRes(key);
                            if (!RES.hasRes(res.json) || !RES.hasRes(res.texture)) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.json)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, egretx.ResourceManager.Instance().loadResAsync(res.texture)];
                        case 2:
                            texture = _a.sent();
                            if (texture) {
                                this.addMemory(key, texture.$bitmapWidth, texture.$bitmapHeight);
                            }
                            if (!this.keys.containsKey(key)) {
                                list = [res.json, res.texture];
                                this.keys.add(key, list);
                            }
                            else {
                                list = this.keys.get(key);
                                if (list.indexOf(res.json) == -1) {
                                    list.push(res.json);
                                }
                                if (list.indexOf(res.texture) == -1) {
                                    list.push(res.texture);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        return MovieClipResourceGroup;
    }(egretx.ResourceGroup));
    egretx.MovieClipResourceGroup = MovieClipResourceGroup;
    __reflect(MovieClipResourceGroup.prototype, "egretx.MovieClipResourceGroup");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    /**
     * ????????????????????????????????????????????????
     */
    var ResourceType;
    (function (ResourceType) {
        ResourceType["UI"] = "UI";
        ResourceType["MovieClip"] = "MovieClip";
        ResourceType["DragonBones"] = "DragonBones";
    })(ResourceType = egretx.ResourceType || (egretx.ResourceType = {}));
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    egretx.IResourceManager = Symbol.for("IResourceManager");
})(egretx || (egretx = {}));
/*************************************************
/* @author : rontian
/* @email  : i@ronpad.com
/* @date   : 2022-07-04
*************************************************/

(function (egretx) {
    egretx.IResourceManagerInternal = Symbol.for("IResourceManagerInternal");
})(egretx || (egretx = {}));
