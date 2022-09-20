import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { kSpacing, kTextSizes } from "../../Utils/Constants";
import Colors from "../../Themes/Colors";
import Layout from "../../Themes/Layout";
import { ItalicText, MediumText, RegularText } from "../../Components/Texts";
import { formatDateMonth } from "../../Utils/Common";
import { useNavigation } from "@react-navigation/native";
import { FileFields } from "../../Models/File";

interface Props {
  item: FileFields;
}

const ThutucItem = ({ item }: Props) => {
  const navigation = useNavigation<any>();
  const onNavigate = (): void => {
    navigation.navigate("FileDetailScreen", { item });
  };
  const onGetColor = () => {
    switch (item.dossierStatus.id) {
      case 0:
        return Colors.purple;
      case 1:
        return Colors.green2;
      case 2:
        return Colors.orange;
      case 3:
        return Colors.primary;
      // Co ket qua
      case 4:
        return Colors.secondary;
      case 5:
        return Colors.navy;
      case 6:
        return Colors.error;
      default:
        return Colors.green1;
    }
  };
  return (
    <TouchableOpacity
      onPress={onNavigate}
      activeOpacity={0.7}
      style={[styles.container, Layout.shadow]}
    >
      {/* <View style={[Layout.rowBetween]}>
        <MediumText numberOfLines={1} style={styles.text}>
          {item.code}
        </MediumText>
        <View
          style={[
            styles.status,
            {
              backgroundColor: onGetColor(),
            },
          ]}
        >
          <RegularText style={[styles.text, { color: Colors.white }]}>
            {item.dossierStatus.name}
          </RegularText>
        </View>
      </View>
      <View style={[Layout.rowBetween, styles.client]}>
        <RegularText style={[styles.text]}>Tên khách hàng</RegularText>
        <MediumText style={styles.name}>
          {item.applicant.data.fullname}
        </MediumText>
      </View>
      <View>
        <RegularText style={styles.name} numberOfLines={3}>
          <MediumText style={styles.name}>Về việc: </MediumText>
          {item.procedure.translate.name}
        </RegularText>
      </View>

      <View style={[styles.dateContainer, Layout.rowBetween]}>
        <ItalicText style={[styles.date, { color: Colors.grey6, flex: 1 }]}>
          Ngày trả dự kiến: {formatDateMonth(item.appointmentDate)}
        </ItalicText>
        <MediumText style={[styles.name]}>{item.statusCurrentTask}</MediumText>
      </View> */}
      <Text>item</Text>
    </TouchableOpacity>
  );
};

export default ThutucItem;

const styles = StyleSheet.create({
  container: {
    marginTop: kSpacing.kSpacing20,
    marginBottom: kSpacing.kSpacing14,
    paddingHorizontal: kSpacing.kSpacing10,
    paddingVertical: kSpacing.kSpacing15,
    backgroundColor: Colors.white,
    marginHorizontal: kSpacing.kSpacing10,
    borderRadius: 5,
  },
  text: {
    flex: 1,
    fontSize: kTextSizes.small,
  },
  status: {
    marginLeft: kSpacing.kSpacing10,
    paddingVertical: kSpacing.kSpacing6,
    paddingHorizontal: kSpacing.kSpacing8,
    borderRadius: 5,
  },
  client: {
    marginVertical: kSpacing.kSpacing10,
  },
  name: {
    fontSize: kTextSizes.small,
  },
  dateContainer: {
    marginTop: kSpacing.kSpacing10,
  },
  date: {
    fontSize: kTextSizes.mini,
  },
});
