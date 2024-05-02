import { type ComputedRef, type Ref, effectScope, nextTick, onScopeDispose, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useElementSize } from '@vueuse/core'
import * as echarts from 'echarts/core'
import {
  BarChart,
  type BarSeriesOption,
  GaugeChart,
  type GaugeSeriesOption,
  LineChart,
  type LineSeriesOption,
  PictorialBarChart,
  type PictorialBarSeriesOption,
  PieChart,
  type PieSeriesOption,
  RadarChart,
  type RadarSeriesOption,
  ScatterChart,
  type ScatterSeriesOption,
} from 'echarts/charts'
import {
  DatasetComponent,
  type DatasetComponentOption,
  GridComponent,
  type GridComponentOption,
  LegendComponent,
  type LegendComponentOption,
  TitleComponent,
  type TitleComponentOption,
  ToolboxComponent,
  type ToolboxComponentOption,
  TooltipComponent,
  type TooltipComponentOption,
  TransformComponent,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { useThemeStore } from '@/store'

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | ScatterSeriesOption
  | PictorialBarSeriesOption
  | RadarSeriesOption
  | GaugeSeriesOption
  | TitleComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | ToolboxComponentOption
  | DatasetComponentOption
>

echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  PictorialBarChart,
  RadarChart,
  GaugeChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])

/**
 * Echarts hooks函数
 * @param options - 图表配置
 * @param renderFun - 图表渲染函数(例如：图表监听函数)
 * @description 按需引入图表组件，没注册的组件需要先引入
 */
export function useEcharts(
  options: Ref<ECOption> | ComputedRef<ECOption>,
  renderFun?: (chartInstance: echarts.ECharts) => void,
) {
  const { theme } = storeToRefs(useThemeStore())

  const domRef = ref<HTMLElement>()

  const initialSize = { width: 0, height: 0 }
  const { width, height } = useElementSize(domRef, initialSize)

  let chart: echarts.ECharts | null = null

  function canRender() {
    return initialSize.width > 0 && initialSize.height > 0
  }

  function isRendered() {
    return Boolean(domRef.value && chart)
  }

  function update(updateOptions: ECOption) {
    if (isRendered()) {
      chart?.clear()
      chart!.setOption({ ...updateOptions, backgroundColor: 'transparent' })
    }
  }

  async function render() {
    if (domRef.value) {
      const chartTheme = theme.value.darkMode ? 'dark' : 'light'
      await nextTick()
      chart = echarts.init(domRef.value, chartTheme)
      if (renderFun) {
        renderFun(chart)
      }
      update(options.value)
    }
  }

  function resize() {
    chart?.resize()
  }

  function destroy() {
    chart?.dispose()
  }

  function updateTheme() {
    destroy()
    render()
  }

  const scope = effectScope()

  scope.run(() => {
    watch([width, height], ([newWidth, newHeight]) => {
      initialSize.width = newWidth
      initialSize.height = newHeight
      if (newWidth === 0 && newHeight === 0) {
        // 节点被删除 将 chart 置为空
        chart = null
      }
      if (canRender()) {
        if (!isRendered()) {
          render()
        }
        else {
          resize()
        }
      }
    })

    watch(
      options,
      (newValue) => {
        update(newValue)
      },
      { deep: true },
    )

    watch(
      () => theme.value.darkMode,
      () => {
        updateTheme()
      },
    )
  })

  onScopeDispose(() => {
    destroy()
    scope.stop()
  })

  return {
    domRef,
  }
}
