

interface PixelProps {
  contentName: string;
  contentIds: string[],
  contentType: string;
  value: number;
  fbId: string;
}
declare let fbq: any;

const ViewContent = (props: PixelProps) => {
  if (!props.fbId) return;
  if (fbq && props.fbId) {
    fbq('trackSingle', props.fbId, 'ViewContent', {
      content_name: props.contentName,
      content_ids: props.contentIds,
      content_type: props.contentType,
      value: props.value,
      currency: 'BRL'
    })
  }
}
const AddToCart = (props: PixelProps) => {
  if (!props.fbId) return;

  if (fbq && props.fbId) {
    fbq('trackSingle', props.fbId, 'AddToCart', {
      content_name: props.contentName,
      content_ids: props.contentIds,
      content_type: props.contentType,
      value: props.value,
      currency: 'BRL'
    })
  }
}
const Purchase = (props: PixelProps) => {
  if (!props.fbId) return;

  if (fbq && props.fbId) {
    fbq('trackSingle', props.fbId, 'Purchase', {
      content_name: props.contentName,
      content_ids: props.contentIds,
      content_type: props.contentType,
      value: props.value,
      currency: 'BRL'
    });
  }
}
const PageView = (fbqId: string) => {
  if (!fbqId) return;

  if (fbq && fbqId) {
    fbq('trackSingle', fbqId, 'PageView');
  }
}

export const Pixel = {
  ViewContent,
  AddToCart,
  Purchase,
  PageView
}