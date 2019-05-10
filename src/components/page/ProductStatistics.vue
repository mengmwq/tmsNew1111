<template>
  <div style="height:100%;">
    <div id="container" style="height:100%;"></div>

  </div>
</template>

<script>
export default {
  name: "ProductStatistics",
  mounted() {
    this.showMap();
  },
  methods: {
    showMap() {
      var o = void 0,
              u = void 0,
              f = {},
              d = {
                color: "#000",
                borderWidth: "0",
                padding: "0",
                  borderRadius: "50%",
                zIndex: "2",
                backgroundColor: "#508DF2",
                textAlign: "center",
                fontFamily: '"Hiragino Sans GB", "Microsoft Yahei UI", "Microsoft Yahei", "微软雅黑", "Segoe UI", Tahoma, "宋体\\5b8b\\4f53", SimSun, sans-serif'
              },
              m = function(e) {
                clearTimeout(u),
                        u = setTimeout(function() {
                          /*List.default.trigger("update", {
                              channel: e
                          })*/
                        }, "zoom" === e || "drag" === e ? 100 / 3 : 100)
              };
      var g_conf = {
        city: 'bj',
        cityId: '100000',
        cityName: '北京',
        mapWrapper: 'container'
      };

      var area = ["海淀", "朝阳区", "昌平", "门头沟", "石景山", "东城", "西城", "大兴", "房山", "通州", "怀柔", "延庆", "顺义", "丰台", "密云"]

      var MokaData = [];

      /**
       * 工具函数集合
       * @type {Object}
       */
      var Utils = {
        init: function() {
          this.addNewMethods();
        },
        rnd: function(n, m) {
          var random = Math.floor(Math.random() * (m - n + 1) + n);
          return random;
        },
        addNewMethods: function() {
          String.trim || (String.prototype.trim = function() {
            for (var e = this.replace(/^\s\s*/, ""), t = /\s/, a = e.length; t.test(e.charAt(--a));)
              ;
            return e.slice(0, a + 1)
          });
          String.replaceTpl || (String.prototype.replaceTpl = function(e) {
            return this.replace(/#\{([^}]*)\}/gm, function(t, a) {
              return e[a.trim()]
            })
          });
          String.htmlEncode || (String.prototype.htmlEncode = function() {
            return String(this).replace(/\x26/g, "&amp;").replace(/\x3c/g, "&lt;").replace(/\x3E/g, "&gt;").replace(/\x22/g, "&quot;").replace(/\x27/g, "&#39;").replace(/\xA9/g, "&copy;")
          });
        },
        replaceTpl: function(e, t, a) {
          var n = String(e),
                  i = a || /#\{([^}]*)\}/gm,
                  l = String.trim || function(e) {
                    return e.replace(/^\s+|\s+$/g, "")
                  };
          return n.replace(i, function(e, a) {
            return t[l(a)]
          })
        }
      };

      Utils.init();

      /**
       * 地图组件
       * @type {Object}
       */
      var Maps = {
        tpl: '<div class="bubble bubble-1" style="background: url(../../assets/img/district-circle.png) no-repeat 0 0;box-shadow: 0 2px 2px rgba(0, 0, 0, .2);border-radius: 50%;overflow: hidden;width: 92px;height: 92px;line-height: 1.6" data-xftrack="10144" data-longitude="#{longitude}" data-latitude="#{latitude}" data-id="#{id}"><p class="name" title="#{name}" style="font-size: 14px;font-weight: 800;margin-top: 24px">#{name}</p><p><span class="count">#{count}</span>个楼盘</p></div>',
        init: function() {
          (o = new BMap.Map(g_conf.mapWrapper, {
            enableMapClick: !1,
            minZoom: 12
          })).enableScrollWheelZoom(),
                  o.disableInertialDragging();
          o.addEventListener("tilesloaded", function e() {
            var t = $(".progress-bar");
            t.addClass("progress-bar-done"),
                    setTimeout(function() {
                      t.addClass("progress-bar-over"),
                              setTimeout(function() {
                                t.hide(200)
                              }, 150)
                      $('#loading').hide();
                    }, 20),
                    o.addControl(new BMap.ScaleControl({
                      anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                      offset: new BMap.Size(20, 20)
                    })),
                    setTimeout(function() {
                      o.removeEventListener("tilesloaded", e)
                    }, 0);
            Maps.getBundury();
          }),
                  o.centerAndZoom(g_conf.cityName, 11),
                  setTimeout(function() {
                    o.addEventListener("zoomend", function() {
                      console.log("zoom")
                      m("zoom")
                    });
                    o.addEventListener("dragend", function() {
                      console.log("drag")
                      m("drag")
                    });
                  }, 100)
        },
        boundary: {
          add: function(e, t) {
            if (!f[e]) {
              var a = new BMap.Polygon(t, {
                strokeWeight: 2,
                strokeColor: "#4285f4",
                strokeOpacity: 1,
                fillOpacity: .1,
                fillColor: "#4285f4",
                enableMassClear: !1
              });
              f[e] = a, f[e].hide(),
                      o.addOverlay(a)
            }
          },
          show: function(e) {
            f[e] && f[e].show()
          },
          hide: function(e) {
            f[e] && f[e].hide()
          },
        },
        bubble: {
          clear: function() {
            o.clearOverlays()
          },
          render: function(data, tpl, a, n) {
            $.each(data, function(e, i) {
              var r = void 0,
                      s = [];

              r = new BMap.Label(Utils.replaceTpl(tpl, i), {
                position: new BMap.Point(i.longitude, i.latitude),
                offset: new BMap.Size(-46, -46)
              });
              if (void 0 !== i.border && i.border.length > 0) {
                var e = i.id;
                Maps.boundary.add(e, i.border);
              }
              r.addEventListener("mouseover", function() {
                this.setStyle({
                  zIndex: "4"
                })
                Maps.boundary.show($(this.V).children(".bubble-1").data("id"))
              }),
                      r.addEventListener("mouseout", function() {
                        this.setStyle({
                          zIndex: "2"
                        })
                        Maps.boundary.hide($(this.V).children(".bubble-1").data("id"))
                      }),
                      r.setStyle(d),
                      o.addOverlay(r),
                      function(e) {
                        setTimeout(function() {
                          e.setStyle({
                            zIndex: "2"
                          })
                        }, 1)
                      }(r);
            })
          }
        },

        getBundury: function() {
          var bdary = new BMap.Boundary();


          $.each(area, function(index, item) {
            (function(item) {
              bdary.get(item, function(rs) { //获取行政区域

                var a = {};
                a.id = item;
                a.name = item;
                a.border = rs.boundaries[0];
                a.count = 100;
                MokaData.push(a);
                if (MokaData.length == area.length) {
                  Maps.getBunduryCenter();
                }
              });
            })(item)
          })
        },

        getBunduryCenter: function(param) {
          var myGeo = new BMap.Geocoder();
          // 将地址解析结果显示在地图上,并调整地图视野
          var count = 0;
          $.each(MokaData, function(index, item) {
            (function(i, t) {
              myGeo.getPoint("北京市" + t.name, function(point) { //获取行政区域
                if (point) {
                  MokaData[i].longitude = point.lng;
                  MokaData[i].latitude = point.lat;
                }
                count++;
                if (count == MokaData.length) {
                  console.info(MokaData);
                  Maps.bubble.clear();
                  Maps.bubble.render(MokaData, Maps.tpl, 1)
                }
              }, "北京市");
            })(index, item)
          })
        },
      }

      Maps.init();
    }
  }
};
</script>

<style scoped>
  .bubble {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: background-color .15s ease-in-out;
    cursor: pointer
  }

  .bubble p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }

  .bubble-1 {
    background: url(../../assets/img/district-circle.png) no-repeat 0 0;
    box-shadow: 0 2px 2px rgba(0, 0, 0, .2);
    border-radius: 50%;
    overflow: hidden;
    width: 92px;
    height: 92px;
    line-height: 1.6
  }

  .bubble-1 .name {
    font-size: 14px;
    font-weight: 800;
    margin-top: 24px
  }
</style>
