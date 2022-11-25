import React, {useRef, useState} from 'react';
import {SafeAreaView, View, StyleSheet, Text} from 'react-native';
import MyUploads from '../../components/app/invoice/MyUploads';
import UploadDocument from '../../components/app/UploadDocument';
import AdaptiveButton from '../../components/button/AdaptiveButton';
import {AppLocalizedStrings} from '../../localization/Localization';
import {hp, wp} from '../../utility/responsive/ScreenResponsive';
import AuthBaseScreen from '../auth/AuthBaseScreen';

interface FileInfo {
  state: UploadState;
  progress: number;
}
enum UploadState {
  idle,
  uploading,
  finished,
}
const InvoiceUploadScreen = () => {
  const [hasInvoice, setHasInvoce] = useState(false);

  const timer = useRef<NodeJS.Timeout>();

  const [invoiceState, setInvoiceState] = useState<FileInfo>({
    state: UploadState.idle,
    progress: 0.0,
  });

  const onUploadHandler = () => {};

  const uploadDocumentHandler = () => {
    if (invoiceState.state == UploadState.idle) {
      timer.current = setInterval(() => {
        setInvoiceState(updateState());
      }, 50);
    }
  };
  const updateState = (): FileInfo => {
    let newState = invoiceState;
    const newProgress = newState.progress + 1;
    const newUploadState =
      newProgress == 100 ? UploadState.finished : UploadState.uploading;
    newState.progress = newProgress;
    newState.state = newUploadState;
    if (newUploadState == UploadState.finished) {
      clearInterval(timer.current);
      setHasInvoce(true);
    }
    return {...newState};
  };
  return (
    <SafeAreaView style={styles.screen}>
      <AuthBaseScreen
        iconName={hasInvoice ? null : 'invoice_upload'}
        title={''}>
        <View style={styles.fileView}>
          <View>
            <UploadDocument
              title={AppLocalizedStrings.auth.attachFile}
              subTitle={AppLocalizedStrings.auth.choosePaymentReceipts}
              percentage={invoiceState.progress}
              isUploading={invoiceState.state == UploadState.uploading}
              onPress={uploadDocumentHandler}
            />
            {hasInvoice && <MyUploads />}
          </View>
          <AdaptiveButton
            title={AppLocalizedStrings.auth.upload}
            onPress={onUploadHandler}
            isDisable={!(invoiceState.state == UploadState.finished)}
            buttonStyle={styles.uploadBtn}
          />
        </View>
      </AuthBaseScreen>
    </SafeAreaView>
  );
};
export default InvoiceUploadScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  fileView: {
    width: wp('90%'),
    borderRadius: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  uploadBtn: {
    marginBottom: hp(5),
  },
});
