import React from "react";
import { StyleSheet } from "react-native";
import _ from "lodash";
import { BaseComponent } from "../../commons";
import Dialog from "../dialog";
import View from "../view";
import Text from "../text";
import { Colors, BorderRadiuses } from "../../style";
import WheelPicker from "../../nativeComponents/WheelPicker";
class PickerDialog extends BaseComponent {
    constructor() {
        super(...arguments);
        this.state = {};
    }
    renderHeader() {
        const { topBarProps } = this.props;
        const title = _.get(topBarProps, "title");
        const titleStyle = _.get(topBarProps, "titleStyle");
        if (title) {
            return (<View style={styles.header}>
          <Text text60 dark10 style={titleStyle}>
            {title}
          </Text>
        </View>);
        }
    }
    renderFooter() {
        const { onDone, onCancel, topBarProps } = this.props;
        const doneLabel = _.get(topBarProps, "doneLabel", "OK");
        const cancelLabel = _.get(topBarProps, "cancelLabel", "CANCEL");
        return (<View style={styles.footer}>
        <Text text80 blue30 onPress={onCancel}>
          {cancelLabel}
        </Text>
        <Text text80 blue30 marginL-15 onPress={onDone}>
          {doneLabel}
        </Text>
      </View>);
    }
    renderPicker() {
        const { children, onValueChange, selectedValue, renderNativePicker } = this.props;
        if (_.isFunction(renderNativePicker)) {
            return renderNativePicker(this.props);
        }
        return (<WheelPicker onValueChange={onValueChange} selectedValue={selectedValue}>
        {children}
      </WheelPicker>);
    }
    render() {
        const dialogProps = Dialog.extractOwnProps(this.props);
        return (<Dialog {...dialogProps} visible height="50%" width="77%">
        <View style={styles.dialog}>
          {this.renderHeader()}
          <View flex centerV paddingH-24>
            {this.renderPicker()}
          </View>
          {this.renderFooter()}
        </View>
      </Dialog>);
    }
}
const styles = StyleSheet.create({
    dialog: {
        flex: 1,
        backgroundColor: Colors.white,
        overflow: "hidden",
        borderRadius: BorderRadiuses.br10,
        paddingHorizontal: 24
    },
    header: {
        paddingTop: 21
    },
    footer: {
        height: 52,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    }
});
export default PickerDialog;
