export const constructTip = (item) => {
    const title = '<div class="popTitle" style="background:transparent !important;">' + item.name + '</div>';
    const html = [];
    html.push('<div>');
    html.push('<div class="infoItems" style="background:transparent !important;"><span>最近上报：</span><span>' + item.intime + '</span></div>')
    html.push('<div class="infoItems" style="background:transparent !important;"><span>本次上线：</span><span>' + item.time + '</span></div>')
    html.push('<div class="infoItems" style="background:transparent !important;"><span>总上报条数：</span><span>' + item.platnum + '</span></div>')
    html.push('<div class="infoItems" style="background:transparent !important;"><span>当前电量：</span><span>' + item.volt + '</span></div>')

    html.push('</div>');
    return {title, html}
}