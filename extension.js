const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const DELAY = 2; // seconds to travel the screen width
const COUNT = 8; // number of objects

let button, active;

function _resetObj(obj) {
    let monitor = Main.layoutManager.primaryMonitor;

    obj.set_position(monitor.x, monitor.y);

    Tweener.addTween(obj,
                     { x: monitor.width,
                       time: DELAY,
                       transition: 'linear',
                       onComplete: _destroyObj,
                       onCompleteParams: [obj] });
}

function _destroyObj(obj) {
    if (obj) {
        Main.uiGroup.remove_actor(obj);
        Tweener.removeTweens(obj);
    }
}

function _createObj() {
    let obj = new St.Label({ style_class: 'obj-label', text: ">>>>" });
    _resetObj(obj);

    Main.uiGroup.add_actor(obj);
}

function _animate() {
    if (active) {
        Tweener.addCaller(this,
                          { onUpdate: _createObj,
                            time: DELAY,
                            count: COUNT,
                            transition: 'linear',
                            onComplete: _animate });
    }
    else {
        Tweener.removeTweens(this);
    }
}

function _onClick() {
    active = !active;

    if (active) {
        _animate();
    }
}

function init() {
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    let icon = new St.Icon({ icon_name: 'system-run-symbolic',
                             style_class: 'system-status-icon' });

    button.set_child(icon);
    button.connect('button-press-event', _onClick);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
