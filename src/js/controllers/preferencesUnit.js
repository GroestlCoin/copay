'use strict';

angular.module('copayApp.controllers').controller('preferencesUnitController', function($scope, $log, configService, go, walletService, profileService) {

  var config = configService.getSync();

  $scope.currentUnit = config.wallet.settings.unitCode;

  $scope.unitList = [
    {
      name: 'uGRS (1,000,000 uGRS = 1GRS)',
      shortName: 'uGRS',
      value: 100,
      decimals: 2,
      code: 'bit',
    },
    {
      name: 'GRS',
      shortName: 'GRS',
      value: 100000000,
      decimals: 8,
      code: 'btc',
    }
  ];

  $scope.save = function(newUnit) {
    var opts = {
      wallet: {
        settings: {
          unitName: newUnit.shortName,
          unitToSatoshi: newUnit.value,
          unitDecimals: newUnit.decimals,
          unitCode: newUnit.code,
        }
      }
    };

    configService.set(opts, function(err) {
      if (err) $log.warn(err);

      go.preferencesGlobal();
      $scope.$emit('Local/UnitSettingUpdated');

      walletService.updateRemotePreferences(profileService.getClients(), {}, function() {
        $log.debug('Remote preferences saved');
      });
    });
  };
});
