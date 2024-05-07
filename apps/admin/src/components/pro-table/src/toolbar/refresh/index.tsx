import { type PropType, defineComponent } from 'vue'
import { NButton, NTooltip } from 'naive-ui'
import IconRefresh from './icon-refresh'

export default defineComponent({
  props: {
    onRefresh: {
      type: Function as PropType<() => void>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <NTooltip>
        {{
          default: () => $t('proTable.action.refresh'),
          trigger: () => (
            <NButton text class="flex-shrink-0" onClick={props.onRefresh}>
              <IconRefresh class="font-size-18px cursor-pointer" />
            </NButton>
          ),
        }}
      </NTooltip>
    )
  },
})
