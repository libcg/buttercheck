
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

let text, button;

function _resetObj() {
    let monitor = Main.layoutManager.primaryMonitor;

    text.set_position(monitor.x,
                      monitor.y);

    Tweener.addTween(text,
                     { x: monitor.width,
                       time: 2,
                       transition: 'linear',
                       onComplete: _resetObj });
}

function _showObj() {
    if (!text) {
        text = new St.Label({ style_class: 'helloworld-label', text: ">>" });
        Main.uiGroup.add_actor(text);
    }

    text.opacity = 255;

    let monitor = Main.layoutManager.primaryMonitor;

    Tweener.addTween(text,
                     { x: monitor.width,
                       time: 2,
                       transition: 'linear',
                       onComplete: _resetObj });
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
    button.connect('button-press-event', _showObj);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
